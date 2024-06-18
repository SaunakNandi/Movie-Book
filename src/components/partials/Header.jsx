import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import './Style.css'

const Header = ({wallpaper,set_page}) => {
    
    const [activeindex,setActiveIndex]=useState(1)
    const [transitionClass, setTransitionClass] = useState('');
    // console.log(wallpaper)
    
    // Using setTimeout for setTransitionClass in the slide transition functions is necessary to ensure that the browser has enough time to apply the initial class before changing it. This approach ensures that the CSS transition actually takes place. Without the setTimeout, the state changes can happen too quickly for the browser to render the transition smoothly.

    const Slide_Left = () => {
        setTransitionClass('carousel-exit-left');
        setTimeout(() => {
          setActiveIndex((prevIndex) => (prevIndex === 0 ? wallpaper.length - 1 : prevIndex - 1));
          setTransitionClass('carousel-enter-left');
        }, 500);
      };
    const Slide_Right=()=>{

        if(activeindex+1==wallpaper.length-1)
            set_page()
        setTransitionClass('carousel-exit-right');
        setTimeout(() => {
            setActiveIndex((activeindex+1) % wallpaper.length)
            setTransitionClass('carousel-enter-right');
        }, 500);
    }
    
    // GetWallpaper();
    useEffect(()=>{
        console.log("called")
        const intervalId=setInterval(() => {
            Slide_Right()
        }, 5000);
        return ()=>{
            clearInterval(intervalId)
        }
    },[activeindex])

  return wallpaper && (
    wallpaper.map((w,i)=>(
        <div key={i} className={`carousel-slide ${activeindex === i ? transitionClass : 'hidden'}`}>
            <div style={{background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.3),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${w.backdrop_path})`,
                    backgroundPosition: `top`,backgroundSize: `cover`}}
                    className="w-full h-[60vh] flex flex-col justify-end pb-[2%] pl-[5%] text-white items-start">
                    <h1 className='text-4xl font-black'>
                        {w.original_title || w.title || w.original_name || w.name}
                    </h1>
                    <p className='w-[50%] mt-3'>{w.overview.slice(0,150)}...
                        <Link className='text-blue-400' to={`/${w.media_type}/details/${w.id}`}> more</Link>
                    </p>
                    <p className='mt-5'>
                        {
                            w.release_date? 
                            <span>
                                <i className="mr-2 ri-megaphone-fill"></i>{w.release_date}
                            </span>
                            :<span></span>
                        }
                        <i className="text-yellow-500 ml-4 mr-2 ri-album-fill"></i>{w.media_type.toUpperCase()}
                    </p>
                    <div className="flex items-center mt-10 gap-10 justify-between w-full">
                        <div>
                        <Link className="p-3 bg-[#6556CD] rounded-lg font-semibold"
                        to={`/${w.media_type}/details/${w.id}/trailer`}>Watch Trailer</Link>
                        </div>
                        <div className='mr-[33vw]'>
                            <i className={`text-4xl mr-3 ri-arrow-left-circle-line cursor-pointer ${i === 0 ? 'hidden' : ''}`}
                            onClick={Slide_Left}></i>
                            <i className="text-4xl ri-arrow-right-circle-line cursor-pointer" onClick={Slide_Right}></i>
                        </div>
                    </div>
                </div>
        </div>
    ))
    )
}

export default Header
