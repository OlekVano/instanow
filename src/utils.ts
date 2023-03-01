import { getAuth, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth'
import { auth } from '../firebase-setup'
import { v4 } from 'uuid'
import { Post, Profile } from './types'

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