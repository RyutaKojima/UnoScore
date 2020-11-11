import firebase from 'firebase/app'
import 'firebase/database'
import { initialState as initialOptionState } from '../hooks/use-option'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABSE_RUL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.database()

export const roundsRef = db.ref('rounds')
export const playersRef = db.ref('players')
export const optionRef = db.ref('option')

export const initializeDatabase = async () => {
  await Promise.all([
    roundsRef.set([]),
    playersRef.set([]),
    optionRef.set(initialOptionState),
  ])
}
