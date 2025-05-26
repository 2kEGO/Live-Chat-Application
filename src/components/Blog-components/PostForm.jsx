import React, {useContext, useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, } from '@fortawesome/free-regular-svg-icons'
import { faIcons } from '@fortawesome/free-solid-svg-icons'
import "../../style/Blog/PostForm.css"


const PostForm = () => {

  const {currentUser} = useContext(AuthContext)
  const [content, setContent]= useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <form className='post-form' onSubmit={handleSubmit}>
      
        <div className="post-form-wrapper">
          
          <div className="user-name">
            <span>{currentUser.displayName?.charAt(0).toUpperCase()}</span>
          </div>

          <div className="post-form-content">
            
            <div className='post-form-input'>
              <input type="text"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder='What`s Happening'
                      className='input-area'
              />
            </div>
            
            <div className="post-form-control">

              <div className="form-icon">
                <FontAwesomeIcon icon={faImage} className='icon-btn' />
                <FontAwesomeIcon icon={faIcons} className='icon-btn' />

              </div>

              <div className="form-button">
                <button className='post-btn'>Post</button>
                
              </div>
            </div>

          </div>

        </div>

    </form>
  )
}

export default PostForm