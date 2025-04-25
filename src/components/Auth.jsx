import React from 'react'
import {auth, provider} from '../firebase-config'
import { signInWithPopup} from 'firebase/auth'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
import { addDoc, setDoc, doc, collection } from 'firebase/firestore'
import { db } from '../firebase-config'


const Auth = () => {


    const handleSubmit = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            console.log(result)
            cookies.set("auth-token",result.user.refreshToken)


            await setDoc(doc(db, "users", result.user.uid), {
                displayName: result.user.displayName,
                email: result.user.email,
                photoUrl: result.user.photoURL,
                uid: result.user.uid
              }, { merge: true })

            await setDoc(doc(db, "userChats", result.user.uid), {});
            

        } catch (error) {
            console.error(error)
        }
        
    }

  return (
    <>
        <div>Sign in with Google</div>
        <button onClick={handleSubmit}>Sign In</button>
    </>
  )
}

export default Auth