import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBAynisDpFRiA4Zbzx4dYF5-3sdi59Aktw',
  authDomain: 'instanow-786a6.firebaseapp.com',
  projectId: 'instanow-786a6',
  storageBucket: 'instanow-786a6.appspot.com',
  messagingSenderId: '746986849844',
  appId: '1:746986849844:web:24977af8b7de25010a2c61'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)