import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../firebase-setup'

export function signInWithGoogle(callback?: Function) {
  const provider = new GoogleAuthProvider()

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user)
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

export function getUserById(id: string) {

}