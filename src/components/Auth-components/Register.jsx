import React, { useState,   } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../style/Login.css"
import LoginInput from '../reusable/LoginInput';


const Register = () => {

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [displayName, setDisplayName] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await createUserWithEmailAndPassword(auth, email, pwd)

            if (res){
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    userName: displayName.toLowerCase().replace(/\s+/g, '')
                })

                await setDoc(doc(db, "userChats", res.user.uid), {});

                navigate('/login')
                
            }
            

        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
      <div className="login-container">
        <div className="login-wrapper-left">
          <img src='https://pbs.twimg.com/media/Gky-_a2aoAUyyeO?format=jpg&name=large' alt="" />
        </div>

        <form className="login-wrapper-right" onSubmit={handleSubmit} autoComplete='off'>

          <div className="login-item-container title" >
            <h1 id='login-title'>Sign Up</h1>
          </div>

          <div className="login-item-container">
            <LoginInput 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
            />
          </div>

          <div className="login-item-container">
            <LoginInput 
              type="password" 
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder='Password'
              autoComplete='off'
            />
          </div>

          <div className="login-item-container btn">
            <LoginInput 
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder='Display Name'
            />
          </div>

          <div className="login-item-container btn">
            <button type='submit'>Sign Up</button> 
          </div>

        </form>
      </div>

    </>
  )
}

export default Register