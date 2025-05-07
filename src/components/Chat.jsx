import React, {useState, useContext} from 'react'
import "../style/chat.css"
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { db, auth } from '../firebase-config'
import { ChatContext } from '../context/ChatContext'
import Messages from './Message'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'


import Input from './Input'



const Chat = () => {
  
  const { data } = useContext(ChatContext);

  return (
    
    <>
      <div className="chat">

        <div className="display-user">          
          <div className="display-user-wrapper">

            <div className="display-username-container">
              {data.user?.displayName && <h2>{data.user.displayName}</h2>}
            </div>

            <div className="display-button-container">
              <button><FontAwesomeIcon icon={faCircleInfo} /></button>
            </div>
            
          </div>
        </div>
        
        <div className="display-message">
          <Messages/>
        </div>

        <div className="send-message-container">
          <Input/>
        </div>
      </div>
    </>
  )
}

export default Chat