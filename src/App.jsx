import React, {useState} from 'react'
import './App.css'
import Auth from "../src/components/Auth.jsx"
import Cookies from 'universal-cookie'
import Room from './components/Room.jsx'
const cookies = new Cookies()

function App() {
  
  const [auth, setAuth] = useState(cookies.get("auth-token"))

  if (!auth){
    return (
    <>
      <Auth/>
    </>
  )}

  return(
    <>
    <Room/>
    </>
  )
  
}

export default App
