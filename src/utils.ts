import { getAuth, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth'
import { auth } from '../firebase-setup'
import { v4 } from 'uuid'
import { Comment, CommentWithoutAuthor, Post, Profile } from './types'

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

export function sortByRecent(array: ({createdAt: number} & {[key: string]: any})[]) {
  let sortedArray = [...array]
  sortedArray.sort(function sort(elem) {
    return elem.createdAt
  }).reverse()
  return sortedArray
}