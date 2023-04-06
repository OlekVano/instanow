import { getAuth, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth'
import { auth } from '../firebase-setup'
import { v4 } from 'uuid'
import { Chat, Comment, CommentWithoutAuthor, Filter, Post, Profile, ProfileWithoutPosts } from './types'
import { imgFilters } from './consts'

export function signInWithGoogle(callback?: Function) {
  const provider = new GoogleAuthProvider()

  signInWithPopup(auth, provider)
    .then((result) => {
      if (callback) callback()
      // const credential = GoogleAuthProvider.credentialFromResult(result)
      // const token = credential.accessToken
      // const user = result.user
    }).catch((error) => {
      // const errorCode = error.code
      // const errorMessage = error.message
      // const email = error.customData.email
      // const credential = GoogleAuthProvider.credentialFromError(error)
    })
}

export function generateUniqueId() {
  return `a${v4()}`
}

export async function getProfileById(id: string, currUser: User): Promise<Profile | undefined> {
  const token = await currUser.getIdToken()
  const res = await fetch(`${import.meta.env.VITE_API_URL}/profiles/${id}`, {headers: new Headers({'Authorization': `Bearer ${token}`})})
  if (res.status !== 200) return undefined
  return await res.json()
}

export async function getPostById(id: string, currUser: User): Promise<Post | undefined> {
  const token = await currUser.getIdToken()
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {headers: new Headers({'Authorization': `Bearer ${token}`})})
  if (res.status !== 200) return undefined
  return await res.json()
}

export async function getPosts(currUser: User): Promise<Post[] | undefined> {
  const token = await currUser.getIdToken()
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {headers: new Headers({'Authorization': `Bearer ${token}`})})
  if (res.status !== 200) return undefined
  return await res.json()
}

export async function getProfiles(currUser: User): Promise<ProfileWithoutPosts[] | undefined> {
  const token = await currUser.getIdToken()
  const res = await fetch(`${import.meta.env.VITE_API_URL}/profiles`, {headers: new Headers({'Authorization': `Bearer ${token}`})})
  if (res.status !== 200) return undefined
  return await res.json()
}

export function timestampToStr(ms: number) {
  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60
  }

  let secondsAfter = Math.floor((Date.now() - ms) / 1000)
  
  let res = ''

  if (secondsAfter > intervals.year) {
    res += `${Math.floor(secondsAfter / intervals.year)} years`
  }
  else if (secondsAfter > intervals.month) {
    res += `${Math.floor(secondsAfter / intervals.month)} months`
  }
  else if (secondsAfter > intervals.day) {
    res += `${Math.floor(secondsAfter / intervals.day)} days`
  }
  else if (secondsAfter > intervals.hour) {
    res += `${Math.floor(secondsAfter / intervals.hour)} hours`
  }
  else if (secondsAfter > intervals.minute) {
    res += `${Math.floor(secondsAfter / intervals.minute)} minutes`
  }
  else {
    return 'Just now'
  }
  res += ' ago'
  return res
}

export function addAuthorsToComments(comments: CommentWithoutAuthor[], author: Profile) {
  let commentsWithAuthors: Comment[] = []
  for (let comment of comments) {
    const commentWithAuthor = addAuthorToComment(comment, author)
    commentsWithAuthors.push(commentWithAuthor)
  }
  return commentsWithAuthors
}

export function addAuthorToComment(comment: CommentWithoutAuthor, author: Profile) {
  let commentWithAuthor: Comment = Object.assign({
    author: author
  }, comment)
  commentWithAuthor.comments = addAuthorsToComments(commentWithAuthor.comments, author)
  return commentWithAuthor
}

export function sortByRecent<T extends ({createdAt: number})[]>(array: T): T {
  let sortedArray: T = [...array] as T
  sortedArray.sort(function sort(elem1, elem2) {
    return elem1.createdAt - elem2.createdAt
  }).reverse()
  return sortedArray
}

export async function getFollowedProfiles (currUser: User): Promise<ProfileWithoutPosts[] | undefined> {
  const token = await currUser.getIdToken()
  const res = await fetch(`${import.meta.env.VITE_API_URL}/profiles/following`, {headers: new Headers({'Authorization': `Bearer ${token}`})})
  if (res.status !== 200) return undefined
  const json = await res.json()
  return json
}

export async function getChats (currUser: User): Promise<Chat[] | undefined> {
  const token = await currUser.getIdToken()
  const res = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {headers: new Headers({'Authorization': `Bearer ${token}`})})
  if (res.status !== 200) return undefined
  const json = await res.json()
  return json
}

export async function getChatById (currUser: User, userId: string): Promise<Chat | undefined> {
  const token = await currUser.getIdToken()
  const res = await fetch(`${import.meta.env.VITE_API_URL}/messages/${userId}`, {headers: new Headers({'Authorization': `Bearer ${token}`})})
  if (res.status !== 200) return undefined
  const json = await res.json()
  return json
}

export async function sendMessage(text: string, image: string = '', chatId: string, currUser: User): Promise<number> {
  const token = await currUser.getIdToken()
  const json = JSON.stringify({
    text: text,
    image: image
  })

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/messages/${chatId}`,
    {
      method: 'POST',
      headers: new Headers({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}),
      body: json
    },
  )
  return res.status
}

export async function readMessages(chatId: string, currUser: User): Promise<number> {
  const token = await currUser.getIdToken()
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/messages/${chatId}/read`,
    {
      method: 'POST',
      headers: new Headers({'Authorization': `Bearer ${token}`}),
    },
  )
  return res.status
}

export function getNumUnreadMessages(chat: Chat): number {
  let nUnreadMessages = 0
  for (let i = chat.messages.length - 1; i >= 0; i--) {
    if (chat.messages[i].authorId !== chat.user.id || chat.messages[i].read === true) {
      break
    }
    else {
      nUnreadMessages++
    }
  }
  return nUnreadMessages
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getFilteredImage(filter: Filter, dataURL: string): Promise<string> {
  return new Promise(function getFilteredImagePromise(resolve, _) {
    let img = new Image()

    img.onload = function() {
      let canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
    
      let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    
      // draw original image onto canvas
      ctx.drawImage(img, 0, 0)
    
      // apply CSS filters to a new canvas
      let filteredCanvas = document.createElement('canvas')
      filteredCanvas.width = img.width
      filteredCanvas.height = img.height
      let filteredCtx = filteredCanvas.getContext('2d') as CanvasRenderingContext2D
      filteredCtx.filter = imgFilters[filter]
      filteredCtx.drawImage(canvas, 0, 0)
    
      const filteredDataURL = filteredCanvas.toDataURL()
      resolve(filteredDataURL)
    }

  // The line below calls image.onload
  img.src = dataURL
  })
}