import React, {useState, useEffect, useContext, useRef} from 'react'
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';

import "../../style/Messages.css"

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext)

    const ref = useRef();

    useEffect(() => {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (snapshot) => {
        if (snapshot.exists()) {
          const chatData = snapshot.data();
          setMessages(chatData.messages);
          
        } else {
          console.log("No chat data found");
        }
      });
    
      return () => {
        unSub();
      };
    }, [data.chatId])


    useEffect(() => {
          ref.current?.scrollIntoView({ behavior: "smooth" });
        }, [messages]);    


    return (
      <div className="messages">
        {messages.map((message) => (
          <div
          ref={ref}
          className={`message ${message.senderId === currentUser.uid ? "owner": "guest"}`}
          key={message.id}
        >
          

          <div className="messageContent">
            <p>{message.text}</p>
            <span>{message.date?.toDate().toLocaleString('en-US', {
                    weekday: 'short', // Fri
                    hour: 'numeric',  // 8
                    minute: '2-digit', // 43
                    hour12: true      // AM/PM format
                  })}</span>

            {message.img && <img src={message.img} alt="" />}
          </div>
        </div>
        ))}
      </div>
    );
}

export default Messages