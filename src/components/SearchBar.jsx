import React, {useState, useContext, useEffect} from 'react'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase-config'
import { AuthContext } from '../context/AuthContext.jsx'
import '../style/SearchBar.css'


const SearchBar = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log(doc.data())
      });
    } catch (err) {
      setErr(true);
      console.error(err);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {


    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    
    try {
      
      // const res1 = await getDoc(doc(db, "userChats", currentUser.uid))


      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoUrl,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error(err)
    }

    setUser(null);
    setUsername("")
  };
    
  return (
    <>
    <div className="searchbar-container">
      <div className="chat-list-searchbar">

        <div className="searchbar-symbol">
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#fafcff",}} />
        </div>

        <div className="searchbar-input">
          <input 
                type="text"
                placeholder="Find a user"
                onKeyDown={handleKey}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                />
        </div>

      </div>

      {user && (
      <div className="user-list">
      
      <div className="users-list-items" onClick={handleSelect}>
        <div className="chat-list-user-info">

          <div className="chat-list-img">
            <span>{user.displayName?.charAt(0).toUpperCase()}</span>
          </div>

          <div className='user-info'>

            <div className='user-info-display'>
              <span className='displayName'>{user.displayName}</span>
            </div>

            {/* <div className="user-info-message">
              <p>This is a placeholder message...</p>
            </div> */}

          </div>
        </div>
      </div>
      </div>
      )}
    </div>
    </>
  )
}

export default SearchBar