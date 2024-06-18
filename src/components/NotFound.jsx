import React from 'react'
import notfound from '../assets/notfound.gif'
const Notfound = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black overflow-hidden'>
        <img className='loader' src={notfound} alt="" />
    </div>
  )
}

export default Notfound