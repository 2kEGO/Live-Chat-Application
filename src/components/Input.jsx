import React, {useState, useContext, } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage, faPaperPlane, faIcons, faNoteSticky, faCircleInfo, faPaperclip} from '@fortawesome/free-solid-svg-icons'

import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc,} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { db, storage } from '../firebase-config';

import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import "../style/Input.css"


const Input = () => {
    const [text, setText] = useState("")
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async (e) => {
      e.preventDefault()

      if (img) {
        const storageRef = ref(storage, uuid());
  
        const uploadTask = uploadBytesResumable(storageRef, img);
  
        uploadTask.on(
          (error) => {
            console.error(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
          }
        );
      } 
      
      else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
        

      }
  
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      setText("");
      setImg(null);
    };

    
  return (
    <>
        <form className="send-message-wrapper" >
            
            <div className="message-button-section">
              <input
                type="file"
                id="file"
                onChange={(e) => setImg(e.target.files[0])}
                style={{ display: "none" }}
              />

              <label htmlFor="file" style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={faPaperclip} />
            </label>
            </div>

            <div className="message-input-section">
              <input 
                type="text" 
                placeholder='Start a new message'
                onChange={(e) => setText(e.target.value)}
                value={text}
                />
            </div>
            
            <div className="message-button-section">
              <button id='send-message-button' onClick={handleSend}>
                <FontAwesomeIcon icon={faPaperPlane} rotation={45} style={{color: "#74C0FC",}}/>
              </button>
            </div>
            
          </form>
    </>
  )
}

export default Input