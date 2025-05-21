import React from 'react'
import "../../style/Blog/Home.css"
import PostForm from './PostForm'

const Home = () => {
  return (
    <>
      <div className="homepage-container">
        <div className="homepage-wrapper">

          <div className="homepage-item">
            <PostForm/>
          </div>

        </div>
      </div>
    </>
  )
}

export default Home