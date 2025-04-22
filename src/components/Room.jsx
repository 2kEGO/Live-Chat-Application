import React from 'react'
import "../style/room.css"
import Chat from '../components/Chat'
import Chat_List from '../components/Chat_List'

const Room = () => {
  return (
    <div className="room-container">
        <div className="room-wrapper">
            
            <div className="chat-list-section">
              <Chat_List/>
            </div>
            
            <div className="chat-section">
              <Chat/>  
            </div>
            

        </div>
    </div>
  )
}

export default Room