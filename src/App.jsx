import React from 'react'
import './App.css'
import HomePage from './Web-structure/HomePage.jsx'
import Login from "./components/Auth-components/Login.jsx"
import Register from './components/Auth-components/Register.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoutes from './utils/ProtectedRoutes.jsx'
import MainChat from './components/Chat-components/MainChat.jsx'
import Home from './components/Blog-components/Home.jsx'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<ProtectedRoutes/>}>
          
          
          <Route path='/' element={<HomePage/>}>
            <Route path='messages' element={<MainChat/>}></Route>
            <Route path='home' element={<Home/>}></Route>
          </Route>

        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
