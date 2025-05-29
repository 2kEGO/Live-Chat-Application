import React, {useContext, useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, } from '@fortawesome/free-regular-svg-icons'
import { faIcons } from '@fortawesome/free-solid-svg-icons'
import "../../style/Blog/PostForm.css"
import { addDoc, arrayUnion, collection, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { v4 as uuid } from "uuid"

const PostForm = () => {

  const {currentUser} = useContext(AuthContext)
  const [content, setContent]= useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addDoc(collection(db, "blogs"), {
        userId: currentUser.uid,
        userName: currentUser.displayName,
        content: content.trim(),
        createdAt: Timestamp.now(),
        likes: 0,
        comments: []
      });      
      
      setContent("")

    } catch (error) {
      console.error(error)
    }
    
  }

  return (
    <form className='post-form' onSubmit={handleSubmit}>
      
        <div className="post-form-wrapper">
          
          <div className="user-name">
            <span className='display-userName'>{currentUser.displayName?.charAt(0).toUpperCase()}</span>
          </div>

          <div className="post-form-content">
            
            <div className='post-form-input'>
              <textarea 
                      type="text"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="What's happening"
                      className='input-area'
              />
            </div>
            
            <div className="post-form-control">

              <div className="form-icon">
                <button className='icon-btn'><FontAwesomeIcon icon={faImage} /></button>
                <button className='icon-btn'><FontAwesomeIcon icon={faIcons} /></button>
              </div>

              <div className="form-button">
                <button className='post-btn' disabled={!content.trim()}>Post</button>
              </div>
            </div>

          </div>

        </div>

    </form>
  )
}

export default PostForm