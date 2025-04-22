import React from 'react'
import "../style/chat_list.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGear, faInbox} from '@fortawesome/free-solid-svg-icons'


const Chat_List = () => {
  return (
  
      <div className="chat-list-wrapper">

        <div className="chat-list-header">
          <header>
            <h1>Messages</h1>
            <button><FontAwesomeIcon icon={faGear} style={{color: "#ffffff",}} /></button>
            <FontAwesomeIcon icon={faInbox} style={{color: "#ffffff",}} />
          </header>
        </div>

        <div className="chat-list-searchbar">
          <input type="text" />
        </div>

      </div>
    
  )
}

export default Chat_List