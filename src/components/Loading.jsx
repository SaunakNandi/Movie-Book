import React from 'react'
import loader2 from '../assets/loader2.gif'
const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black overflow-hidden'>
        <img className='w-full loader' src={loader2} alt="" />
    </div>
  )
}

export default Loading