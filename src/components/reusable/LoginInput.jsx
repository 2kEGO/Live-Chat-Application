import React from 'react'

const LoginInput = ({type, value, onChange, placeholder}) => {
  return (
    <>
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}/>
    </>
  )
}

export default LoginInput