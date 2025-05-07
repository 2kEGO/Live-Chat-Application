import React, { useState, useEffect, useContext } from 'react'
import "../style/chat_list.css"
import { AuthContext } from '../context/AuthContext.jsx'
import { ChatContext } from "../context/ChatContext.jsx"
import SearchBar from './SearchBar.jsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faInbox, } from '@fortawesome/free-solid-svg-icons'

import { db } from '../firebase-config.js'
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore'



const SideBar = () => {
  
  const [chats,setChats] = useState([])
  const [userInfo, setUserInfo] = useState([])
  const [err, setErr] = useState(false)

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const fetchAllUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.uid !== currentUser.uid) { // skip current user
          // usersList.push(data);
          setUserInfo(data)
          console.log(data)
        }
          
      });
      
      
      // setUserName(usersList.displayName)
      setUserInfo(usersList);
      
    } catch (error) {
      console.error("Error fetching users:", error);
      setErr(true);
    }
  };  

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  


  return (
  
      <div className="chat-list-wrapper">

        <div className="chat-list-items">
          <div className="chat-list-items-wrapper">
          
            <div className="header-title">
              <h2 style={{color: "#ffffff",}}>Messages</h2>
            </div>

            <div className="message-button-section" id='header-button'>
              <button><FontAwesomeIcon icon={faGear} style={{color: "#ffffff",}} /></button>
              <button><FontAwesomeIcon icon={faInbox} style={{color: "#ffffff",}} /></button>
            </div>
          </div>

        </div>

        <div className="chat-list-items" id='searchbar-section'>

          <SearchBar/>

        </div>

        <div className="user-list">

        {err && <span>error</span>}
        {chats && Object.entries(chats).map(([chatId, chat]) => (
          <div className="users-list-items" key={chatId} onClick={() => handleSelect(chat.userInfo)}>
            <div className="chat-list-user-info">

              <div className="chat-list-img">
                {/* <span>{chat.userInfo.displayName?.charAt(0).toUpperCase()}</span> */}
              </div>

              <div className='user-info'>
                <div className='user-info-display'>
                  {/* <h3 className='displayName'>{chat.userInfo.displayName}</h3> */}
                </div>
                <div className="user-info-message">
                  {/* <p>{chat.lastMessage?.text}</p> */}
                </div>
              </div>

            </div>
          </div>
        ))}


        </div>

      </div>
    
  )
}

export default SideBar