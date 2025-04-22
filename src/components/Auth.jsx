import React from 'react'
import {auth, provider} from '../firebase-config'
import { signInWithPopup} from 'firebase/auth'
import Cookies from 'universal-cookie'
const cookies = new Cookies()


const Auth = () => {


    const handleSubmit = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            console.log(result)
            cookies.set("auth-token",result.user.refreshToken)
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