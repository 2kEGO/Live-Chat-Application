import React from 'react'
import "../style/room.css"
import Chat from '../components/Chat'
import SideBar from './SideBar'

const Room = () => {
  return (
    <div className="room-container">
        <div className="room-wrapper">
            
            <div className="chat-list-section">
              <SideBar/>
            </div>
            
            <div className="chat-section">
              <Chat/>  
            </div>
            

        </div>
    </div>
  )
}

export default Room