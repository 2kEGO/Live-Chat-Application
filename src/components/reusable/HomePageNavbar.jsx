import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';


const HomePageNavbar = () => {

  const navItems = [
  { label: "Home", icon: faHouse, to:"/home" },
  { label: "Messages", icon: faEnvelope, to: "/messages" },

];

  return (
      <nav className='homepage-nav'>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end>

            <div className='banner-nav-item'>

              <div className='banner-item-icon'>
                <FontAwesomeIcon icon={item.icon} style={{color: "white"}}/>
              </div>

              <div className='banner-item-label'>
                <span>{item.label}</span>
              </div>

            </div>

          </NavLink>
        ))}
      </nav>

    )
  }

export default HomePageNavbar