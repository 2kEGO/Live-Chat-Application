import React, { useState, useEffect, useContext } from 'react'
import "../../style/chat_list.css"
import { AuthContext } from '../../context/AuthContext.jsx'
import { ChatContext } from "../../context/ChatContext.jsx"
import SearchBar from './SearchBar.jsx'
import { signOut } from "firebase/auth";
import { db, auth } from '../../firebase-config.js'
import { doc, onSnapshot } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import UserList from './UserList.jsx'


const SideBar = () => {
  
  const [chats,setChats] = useState([])
  const [err, setErr] = useState(false)
  const [selectedChatId, setSelectedChatId] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const navigate = useNavigate()

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        // console.log("doc data:", doc.data())
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  

  const handleSelect = (u, id) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setSelectedChatId(id);
  };

  const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/login");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};


  return (
  
      <div className="chat-list-wrapper">

        <div className="chat-list-items">
          <div className="chat-list-items-wrapper">
          
            <div className="header-title">
              <h2 style={{color: "#ffffff",}}>Messages</h2>
            </div>

            <div className="message-button-section" id='header-button'>
              <button onClick={handleLogout} style={{ color: "white" }}>LogOut</button>
              
            </div>
          </div>

        </div>

        <div className="chat-list-items" id='searchbar-section'>
          <SearchBar/>
        </div>

        <div className="user-list">

          <UserList 
            chats={chats} 
            selectedChatId={selectedChatId} 
            onSelect={handleSelect} 
            error={err} 
          />

        </div>

      </div>
    
  )
}

export default SideBar