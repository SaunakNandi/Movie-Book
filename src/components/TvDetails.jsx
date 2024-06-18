import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadtv, removetv } from '../store/actions/tvActions'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import HorizontalCards from './partials/HorizontalCards'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import no_image from '../assets/no_image.png'

const TvDetails = () => {
  const {pathname} =useLocation()
  const navigate=useNavigate()
  const {id}=useParams()
  const {info}=useSelector(state=>state.tv)
  const dispatch=useDispatch();
  const [show,setShow]=useState(true)
  useEffect(()=>{
    dispatch(asyncloadtv(id))

    // unmounting the data for clean up
    return ()=>{
      dispatch(removetv())
    }
  },[id])
  console.log(info && info)
  return info?(
    <div className='w-full h-[160vh] px-[10%] relative overflow-y-auto'
    style={{background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.3),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path || info.detail.poster_path})`,
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
          <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}>
            <i className="ri-earth-fill"></i>
          </a>
          <a target='_blank' href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}>imdb</a>
        </nav>

      {/* Part2 Poster and details */}
      <div className="w-full flex">
        <img
        className="h-[50vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]" 
                  src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`} alt="" />
        <div className="content ml-[5%] text-white">
          <h1 className='text-5xl text-zinc-100 font-black flex items-end'>
                      {info.detail.original_title || info.detail.title || info.detail.original_name || info.detail.name}
                      {/* <small className='text-2xl font-bold text-zinc-300 ml-1'>
                        ({info.detail.release_date.split("-")[0]})
                      </small> */}
          </h1>
          {
            info.detail.vote_average && (
            <div className="mt-3 mb-5 flex text-zinc-100 items-center gap-x-5">
              <h2 className='w-fit font-semibold text-2xl leading-4'> tv rating</h2>
              <span className="text-white w-[5vh] h-[5vh] flex justify-center items-center rounded-full text-xl font-semibold bg-yellow-600 mt-2">
                  {(info.detail.vote_average*10).toFixed()}{" "}<sup>%</sup>
              </span>
              <h2 className="">{info.detail.first_air_date}</h2>
              <h1>{info.detail.genres.map((g)=> g.name).join(", ")}</h1>
            </div>
            )
          }
          <h2 className='text-xl font-semibold italic text-zinc-200'>
            Created by- {info.detail.created_by.map(person=> person.original_name).join(", ")}
          </h2>
          <h1 className='text-2xl font-bold italic text-zinc-200 mt-4'>{info.detail.tagline}</h1>
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
            className="p-3 bg-[#6556CD] rounded-lg font-semibold">
              Play Trailer 
            <i className="ml-3 text-xl ri-play-large-fill"></i></Link>
          </div>
          {/* the Outlet component is used as a placeholder to render child routes within a parent route. This allows for nested routing */}
          <Outlet/>
        </div>
      </div>

      {/* Part3 Available on platform*/}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {
          info.watchProviders && info.watchProviders.flatrate && 
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

      {/* Part4 Casts */}
      <div className="mt-[5vh]">
        <h1 className='mb-6 text-4xl text-white font-semibold'>Casts</h1>
        <HorizontalCards trend={info.casts} category={'person'}/>
      </div>

      {/* Part5 seasons */}
      <div className="mt-[10vh]">
        <h1 className='mb-6 text-4xl text-white font-semibold'>Seasons</h1>
        <div className="w-[100%] h[55vh] flex overflow-y-hidden mb-5 p-3">
          {
            info.detail.seasons.length>0 ?
            
             ( info.detail.seasons.map((season,i)=>(
              
                <Link to={`/tv/details/${id}/season/${season.season_number}`}
                 className='w-[12vw] mr-[6%]' key={i}>
                  <img className="h-[40vh] object-center shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] min-w-[15vw]" 
                    src={(season.poster_path)?`https://image.tmdb.org/t/p/original/${season.poster_path}`
                    :
                    no_image} alt="" />
                  <h1 className='text-2xl text-zinc-300 font-semibold mt-3'>
                      {season.name}
                  </h1>
                </Link>
            )))
            :
            <h1 className='mb-3 text-4xl text-white font-bol'>Currently Not Available</h1>
          }
        </div>
      </div>

      {/* Part5 Recommendations and Similar Stuff */}
      <div className="mt-[10vh]">
        <h1 className='mb-6 text-4xl text-white font-semibold'>Recommended Movies</h1>
        <HorizontalCards trend={info.recommendations.length>0 ? info.recommendations:info.similar}
        category={'tv'}/>
      </div>

    </div>
  ):<Loading/>
}

export default TvDetails