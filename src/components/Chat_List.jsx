import React, { useState, useEffect } from 'react'
import "../style/chat_list.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGear, faInbox, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

import { db } from '../firebase-config'
import { collection, query, where, getDocs } from 'firebase/firestore'
import img from '../assets/default.png'


const Chat_List = () => {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState('')
  const [err, setErr] = useState(false)

  // const handleSearch = async () => {
  //   const q = query(collection(db, "users"),
  //              where("displayName", "==", userName)
  //   );

  //   try {
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data())
  //       setUser(doc.data())
  //   });

  //   } catch (error) {
  //     console.error(error)
  //   }
    

  // };

  const fetchAllUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = [];
  
      querySnapshot.forEach((doc) => {
        usersList.push(doc.data());
      });
  
      console.log("All users:", usersList);
      setUser(usersList);
  
    } catch (error) {
      console.error("Error fetching users:", error);
      setErr(true);
    }
  };

  const UserName = () => {
    return <span>{user[0]?.displayName.charAt(0).toUpperCase()}</span>;
  };
  

  useEffect(() => {
    fetchAllUsers();
  }, []);

  



  // const handleKey = (e) => {
  //   e.code === "Enter" && handleSearch()
  // };

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

          <div className="chat-list-searchbar">

            <div className="searchbar-symbol">
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#fafcff",}} />
            </div>

            <div className="searchbar-input">
              <input 
                    type="text"
                    placeholder='Search Direct Message'
                    // value={userName}
                    // onChange={(e) => setUserName(e.target.value)}
                    // onKeyDown={handleKey}
                    />
            </div>

          </div>

        </div>

        <div className="user-list">

          {err && <span>error</span>}
          {Array.isArray(user) && user.map((u, index) => (
          <div className="chat-list-items" key={index}>
            <div className="chat-list-user-info">
              <div className="chat-list-img">
              {u.photoURL ? (
                <img src={u.photoURL} alt="user avatar" />
              ) : (
                <span>{u.displayName?.charAt(0).toUpperCase()}</span>
              )}
              </div>

              <div className='user-info'>
                <div className='user-info-display'>
                  <span className='displayName'>{u.displayName}</span>
                </div>
                <div className="user-info-message">
                  <p>This is a placeholder message...</p>
                </div>
              </div>
            </div>
          </div>
        ))}


        </div>

      </div>
    
  )
}

export default Chat_List