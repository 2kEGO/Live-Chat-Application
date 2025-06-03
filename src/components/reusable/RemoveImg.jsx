import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'


const RemoveImg = ({onClick}) => {
  return (
    <button 
        className='removeImg'
        onClick={onClick}
        type='button'
    >
    <FontAwesomeIcon icon={faX} />    
    </button> 
  )
}

export default RemoveImg