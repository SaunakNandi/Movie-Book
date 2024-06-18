import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Notfound from '../NotFound'
const Trailer = () => {
    const {pathname}=useLocation()
    const navigate=useNavigate()
    const category=pathname.includes("movie")? "movie":"tv"
    const yt_video=useSelector(state=>state[category].info.videos)
    console.log(yt_video)
  return (
    <div className ="absolute top-0 left-0 z-[100] w-full h-full flex items-center  justify-center bg-[rgba(0,0,0,0.9)] overflow-hidden">
        <Link onClick={()=>navigate(-1)} 
          className="ri-close-fill hover:text-[#6556CD] absolute text-white top-[15%] right-[5%] text-4xl z-[99]"></Link> 
        {yt_video ?
        <ReactPlayer controls height={800} width={1500} url={`https://www.youtube.com/watch?v=${yt_video.key}`}/>
        :<Notfound></Notfound>}
        
    </div>
  )
}

export default Trailer