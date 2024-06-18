import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useLocation, useParams, useNavigate, Outlet } from 'react-router-dom'
import Loading from './Loading'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadseason, removeseason } from '../store/actions/seasonAction'
import { Link } from 'react-router-dom'
import no_image from '../assets/no_image.png'

const TvSeasons = () => {
    
    const {id}=useParams()
    const {pathname}=useLocation()

    //console.log(useSelector(state=> state.season))
    const {info}=useSelector(state=> state.season)
    const navigate=useNavigate()
    const [show,setShow]=useState(true)
    const dispatch=useDispatch()
    // console.log(pathname)
    const series=pathname.split('/')[3]
    // console.log(series)
    
    useEffect(()=>{
        dispatch(asyncloadseason(series,id))
        return ()=>{
            removeseason()
        }
    },[])
    console.log(info && info)
  return info?(
    <div className='w-full h-[160vh] px-[10%] relative overflow-y-auto'
    style={{background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.3),rgba(0,0,0,.8)),
    url(info.detail.poster_path? (https://image.tmdb.org/t/p/original/${info.detail.backdrop_path || info.detail.poster_path})
  :
    no_image)`,
    backgroundPosition: `top`,backgroundSize: `cover`,backgroundRepeat:'no-repeat'}}>

      {/* Part1 is navigation */}
      <nav className='h-[10vh] w-full text-zinc-200 flex gap-10 items-center text-2xl'>
          {/* back icon */}
          <Link onClick={()=>navigate(-1)} 
          className="mr-2 ri-arrow-left-line hover:text-[#6556CD] font-4xl"></Link>  
          {/* using <a> tag because we need to redirect it to different page*/}
          {/* target=_blank for next page */}
          <a href={info.detail.homepage} target='_blank'>
            <i className="ri-external-link-fill"></i>
          </a>
        </nav>

      {/* Part2 Poster and details */}
      <div className="w-full flex">
        <img
        className="h-[50vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]" 
                  src={(info.detail.poster_path)?`https://image.tmdb.org/t/p/original/${info.detail.poster_path}`
                :
                no_image} alt="" />
        <div className="content ml-[5%] text-white">
          <h1 className='text-5xl text-zinc-100 font-black flex items-end'>
                      {info.detail.original_title || info.detail.title || info.detail.original_name || info.detail.name}
                      {/* <small className='text-2xl font-bold text-zinc-300 ml-1'>
                        ({info.detail.release_date.split("-")[0]})
                      </small> */}
          </h1>
          {
            info.detail.air_date && (
            <div className="mt-3 mb-5 flex text-zinc-100 items-center gap-x-5">
              <h2 >{info.detail.air_date}</h2>
            </div>
            )
          }
          
          <h1 className='text-2xl font-bold italic text-zinc-200'>{info.detail.tagline}</h1>
          <div className="flex mb-3 mt-5">
            <h2 className="text-2xl font-semibold ">Overview</h2>

            {
              (show===true)?
              <span onClick={()=>setShow(!show)}
              className='w-[3vh] h-[3vh] bg-green-600 rounded-full flex items-center justify-center mt-1 ml-3 text-3xl'>
                <i className="ri-arrow-drop-up-line"></i>
              </span>
              :
              <span onClick={()=>setShow(!show)}
              className='w-[3vh] h-[3vh] bg-green-600 rounded-full flex items-center justify-center mt-1 ml-3 text-3xl'>
                <i className="ri-arrow-drop-down-line"></i>
              </span>
            }
            
          </div>
          {!show && <p className='text-xl'>{info.detail.overview}</p>}
          <div className='mt-10'>
            <Link to={`${pathname}/trailer`}
            className=' p-5 bg-[#6556CD] rounded-lg'>
              Play Trailer 
            <i className="ml-3 text-xl ri-play-large-fill"></i></Link>
          </div>
          {/* the Outlet component is used as a placeholder to render child routes within a parent route. This allows for nested routing */}
          <Outlet/>
        </div>
      </div>

      {/* Part3 Available on platform*/}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchProviders && info.watchProviders.flatrate && 
          (
            <div className="flex items-center gap-x-10 text-white">
              <h1>Available on Platform</h1>
              {
                info.watchProviders.flatrate.map((x)=>(
                  <img className='w-[5vh] h-[5vh] object-cover rounded-md'
                  title={x.provider_name}
                  key={x.provider_id}
                    src={`https://image.tmdb.org/t/p/original/${x.logo_path}`} alt=''/>
                ))
              }
            </div>
          )}

          {info.watchProviders && info.watchProviders.rent && 
          (
            <div className="flex items-center gap-x-10 text-white">
              <h1>Available on Rent</h1>
              {
                info.watchProviders.rent.map((x)=>(
                  <img key={x.provider_id} className='w-[5vh] h-[5vh] object-cover rounded-md'
                  title={x.provider_name}
                    src={`https://image.tmdb.org/t/p/original/${x.logo_path}`} alt=''/>
                ))
              }
            </div>
          )}
          {info.watchProviders && info.watchProviders.buy && 
          (
            <div className="flex items-center gap-x-10 text-white">
              <h1>Available to Buy</h1>
              {
                info.watchProviders.buy.map((x)=>(
                  <img key={x.provider_id} className='w-[5vh] h-[5vh] object-cover rounded-md'
                  title={x.provider_name} // on hover title will get displayed
                    src={`https://image.tmdb.org/t/p/original/${x.logo_path}`} alt=''/>
                ))
              }
            </div>
          )}
      </div>

      {/* Part4 seasons */}
      <div className="mt-[10vh]">
        <h1 className='mb-6 text-4xl text-white font-semibold'>Episodes</h1>
        <div className="w-[100%] h[55vh] flex overflow-y-hidden mb-5 p-3">
          {
            info.detail.episodes.length>0 ?
            
             ( info.detail.episodes.map((x,i)=>(
              
                <Link
                 className='w-[12vw] mr-[6%]' key={i}>
                  <img className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] min-w-[15vw]" 
                    src={(x.still_path)?`https://image.tmdb.org/t/p/original/${x.still_path}`:no_image} alt="" />
                  <h1 className='text-2xl text-zinc-300 font-semibold mt-3'>
                      {x.name}
                  </h1>
                </Link>
            )))
            :
            <h1 className='mb-3 text-4xl text-white font-bol'>Currently Not Available</h1>
          }
        </div>
      </div>


    </div>
  ):<Loading/>
}

export default TvSeasons