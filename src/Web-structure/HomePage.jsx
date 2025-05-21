import React from 'react'
import MainChat from '../components/Chat-components/MainChat'
import HomePageBanner from './HomePageBanner'
import './Main.css'
import { Outlet } from 'react-router-dom'

const HomePage = () => {

  return (
    <>

    <div className="homepage">
      <div className="homepage-wrapper">

        <div className="homepage-banner">
          <HomePageBanner/>
        </div>

        <div className="homepage-content">
          <Outlet/>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default HomePage