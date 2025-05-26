import React from 'react'
import "../../style/Blog/Home.css"
import PostForm from './PostForm'
import News from './News'
import BlogContent from './BlogContent'

const Home = () => {
  
  return (
    <>
      <div className="homepage-container">
        <div className="homepage-blog">

          <div className="homepage-item">
            <PostForm/>
          </div>

          <div className="homepage-blog-content">
            <BlogContent/>
          </div>

        </div>

        <div className="homepage-news">
          <News/>
        </div>

      </div>
    </>
  )
}

export default Home