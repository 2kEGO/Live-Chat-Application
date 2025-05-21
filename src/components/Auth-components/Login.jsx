import React, {useState} from 'react'
import {auth, provider, db} from '../../firebase-config'
import { signInWithPopup, signInWithEmailAndPassword} from 'firebase/auth'
import Cookies from 'universal-cookie'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'
import '../../style/Login.css'
import LoginInput from '../reusable/LoginInput'


const Login = () => {

  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const cookies = new Cookies()

  const navigate = useNavigate();

  const googleLogin = async (e) => {
    e.preventDefault();

      try {
          const result = await signInWithPopup(auth, provider)
          console.log(result)
          cookies.set("auth-token", result.user.refreshToken)
          navigate('/home')

          const user = await getDoc(doc(db, "users", result.user.uid))
          const userChats = await getDoc(doc(db, "userChats", result.user.uid))
          
          if (!user.exists()) {

            await setDoc(doc(db, "users", result.user.uid), {
              displayName: result.user.displayName,
              userName: result.user.displayName.toLowerCase().replace(/\s+/g, ''),
              email: result.user.email,
              uid: result.user.uid,
            })
            
          }

          if (!userChats.exists()){
            await setDoc(doc(db, "userChats", result.user.uid), {})
          }         

      } catch (error) {
          console.error(error)
      }
      
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(auth, email, pwd);

      if(res){

        cookies.set("auth-token", res.user.refreshToken);
        navigate('/home')
      }
      
      console.error("cant login")
      

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

        <form className="login-wrapper-right" onSubmit={handleSubmit}>

          <div className="login-item-container title" >
            <h1>Login</h1>
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
            />
          </div>

          <div className="login-item-container">
            <button type='submit'>Sign In</button>
          </div>

          
          <div className="separator">
            <span>Or</span>
          </div>

          <div className="login-item-container">
            <button onClick={googleLogin} >Sign in with Google</button>
          </div>

          <div className="login-item-container">
            <p>Don't have an account? <Link to="/Register">Sign Up</Link></p>
          </div>

        </form>

      </div>
    </>
  )

}

export default Login