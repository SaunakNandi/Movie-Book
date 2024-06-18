import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadperson, removeperson } from '../store/actions/personActions'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import HorizontalCards from './partials/HorizontalCards'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import Dropdown from './partials/Dropdown'

const PersonDetails = () => {
  const {pathname} =useLocation()
  const navigate=useNavigate()
  const {id}=useParams()
  const {info}=useSelector(state=>state.person)
  const dispatch=useDispatch();
  const [show,setShow]=useState(true)
  const [category,setCategory]=useState("movie")

  useEffect(()=>{
    dispatch(asyncloadperson(id))

    // unmounting the data for clean up
    return ()=>{
      dispatch(removeperson())
    }
  },[id])
  return info?(
    <div className='p-[8%] w-screen h-[300vh] bg-[#1F1E24] overflow-x-hidden'>
      {/* Part1 is navigation */}
      <nav className='h-[10vh] w-full text-zinc-200 flex gap-10 items-top text-2xl'>
          {/* back icon */}
          <Link onClick={()=>navigate(-1)} 
          className="mr-2 ri-arrow-left-line hover:text-[#6556CD] font-4xl"></Link>  
          
      </nav>

      {/* Part2 left poster and details */}
      <div className="w-full flex">
        <div className="w-[20%]">
          <img
          className="h-[40vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] object-cover" 
      src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path || info.detail.poster_path}`} alt="" />
          <hr className='mt-10 mb-5 border-none h-[2px] bg-zinc-500'/>

          {/* Social Media link */}
          <div className="text-2xl text-white flex gap-x-5">
            <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}>
              <i className="ri-earth-fill"></i>
            </a>
            <a target='_blank' href={`https://www.instagram.com/${info.externalId.instagram_id}`}>
              <i className="ri-instagram-fill"></i>
            </a>
            <a target='_blank' href={`https://www.instagram.com/${info.externalId.twitter_id}`}>
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          {/* Personal Information */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">Personal Info</h1>
          <h1 className="text-xl text-zinc-400 font-semibold ">Name</h1>
          <h1 className="text-lg text-zinc-400">{info.detail.name}</h1> 
          <h1 className="text-xl text-zinc-400 font-semibold mt-5">Known For</h1>
          <h1 className="text-lg text-zinc-400">{info.detail.known_for_department}</h1>
          <h1 className="text-xl text-zinc-400 font-semibold mt-5">Gender</h1>
          <h1 className="text-lg text-zinc-400">{info.detail.gender===2?"Male":"Female"}</h1>
          <h1 className="text-xl text-zinc-400 font-semibold mt-5">Birth Day</h1>
          <h1 className="text-lg text-zinc-400">{info.detail.birthday}</h1>
          <h1 className="text-xl text-zinc-400 font-semibold mt-5">Place of Birth</h1>
          <h1 className="text-lg text-zinc-400">{info.detail.place_of_birth}</h1>
        </div>


        
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-5xl text-zinc-400 font-black">Name</h1>
          <h1 className="text-2xl text-zinc-400">{info.detail.name}</h1> 
          <h1 className="text-xl text-zinc-400 mt-5 font-semibold">Biography</h1>
          <p className='text-zinc-400 mt-3'>{info.detail.biography}</p>
          <h1 className="text-xl text-zinc-400 font-semibold mt-5">Worked in</h1>
          <HorizontalCards trend={info.combinedCredits.cast}/>

          <div className="flex w-full justify-between">
            <h1 className="text-xl text-zinc-400 font-semibold mt-5">Acting</h1>
            <Dropdown title="Category" options={["tv","movie"]} func={(e)=>setCategory(e.target.value)}/>
          </div>

          <div className="w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl mt-5 shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5 text-zinc-400 list-disc">
            {
            info[category+"Credits"].cast.map((c,i)=>(
              <li key={i} className="hover:text-white hover:bg-[#19191d] duration-300 cursor-pointer p-5">
                <Link className='' to={`/${category}/details/${c.id}`}>
                  <span>{"Movie Name: "}{c.name || c.original_title || c.title || c.original_name}</span>
                  <span className='block'>{c.character && `Character name: ${c.character}`}</span>
                </Link>
              </li>
            ))}

          </div>
        </div>
      </div>
    </div>
  ):<Loading />
}

export default PersonDetails