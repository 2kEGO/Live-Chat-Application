import React, {useState} from 'react'
import "../style/chat.css"
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { db, auth } from '../firebase-config'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage, faPaperPlane, faIcons, faNoteSticky} from '@fortawesome/free-solid-svg-icons'


const Chat = () => {

  const [newMessage, setNewMessage] = useState("")

  const messageRef = collection(db, "messages")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      
    })

  }

  return (
    
    <>
      <div className="chat">
        <div className="display-message"></div>

        <div className="send-message-container">
          <form className="send-message-wrapper" onSubmit={handleSubmit}>
            
            <div className="message-button-section">
              <button><FontAwesomeIcon icon={faImage} style={{color: "#74C0FC",}}/></button>
              <button><FontAwesomeIcon icon={faNoteSticky} style={{color: "#74C0FC",}}/></button>
              <button><FontAwesomeIcon icon={faIcons} style={{color: "#74C0FC",}}/></button>
            </div>

            <div className="message-input-section">
              <input 
                type="text" 
                placeholder='Start a new message'
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                />
            </div>
            
            <div className="message-button-section">
              <button id='send-message-button' type='submit' >
                <FontAwesomeIcon icon={faPaperPlane} rotation={45} style={{color: "#74C0FC",}}/>
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </>
  )
}

export default Chat