import React, {useContext} from 'react'
import "./HomePageBanner.css"
import HomePageNavbar from '../components/reusable/HomePageNavbar' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarlybirds } from '@fortawesome/free-brands-svg-icons'
import { AuthContext } from '../context/AuthContext'


const HomePageBanner = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <>
    <div className='banner'>

      <div className="banner-item-container">

        <div className="banner-item">
          <FontAwesomeIcon icon={faEarlybirds} style={{color: "#ffffff",}}/>
        </div>

        <div className="banner-nav">
          <HomePageNavbar/>
        </div>

        <div className="banner-item-button">
          <button className='post-btn'>Post</button>
        </div>


      </div>

      <div className="user-display-container">
        <div className="chat-list-user-info">

          <div className="chat-list-img">
            <span className='display-userName'>{currentUser.displayName?.charAt(0).toUpperCase()}</span>
          </div>

          <div className='user-info'>

            <div className='user-info-display'>
              <h3 className='displayName'>{currentUser.displayName}</h3>
            </div>

            <div className="user-info-message">
              <p>{currentUser.email}</p>
            </div>

          </div>

        </div>
      </div>

    </div>
    </>
  )
}

export default HomePageBanner