import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import left_arrow from '../assets/left_arrow.gif'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import axios from '../utils/axios'
import Cards from './partials/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component';

const TvShow = () => {
    const [category,setCategory]=useState("airing_today")
    const [tv,setTv]=useState([])
    const [page,setPage]=useState(1)
    const [hasMore,sethasMore]=useState(true)
    document.title='Tv shows'
    const navigate=useNavigate()

    const GetTv=async()=>{
        try{
            const {data}=await axios.get(`/tv/${category}?page=${page}`)
            // setTv(data.results)
            console.log(data.results.length)
            console.log(page)
            if(data.results.length>0)
            {
                // for this logic we have to do reset tv[] whenever the catergory or duration get changed 
                setTv((prevState)=>[...prevState,...data.results])
                setPage(page+1)
            }
            else
                sethasMore(false)
            
            console.log(data);
        }
        catch(err)
        {
            console.log("Error ",err)
        }
    }

    const refreshHandler=()=>{
        if(tv.length===0)
            GetTv()
        else
        {
            setPage(1)
            setTv([])
            GetTv()
        }
    }

    useEffect(()=>{
        refreshHandler()  // you can uncheck the above and it still works. The instructor has actually done in this way
    },[category])
  return  tv.length>0 ? (
    <div className='w-screen h-screen bg-[#28283c]'>
        <div className="px-[3%] w-full flex items-center justify-between">
            <h1 className='w-[20%] text-3xl text-zinc-400 font-semibold'>
                <i onClick={()=>navigate(-1)}
                className="mr-2 ri-arrow-left-line hover:text-[#6556CD] cu"></i> 
                Tv<small className='ml-2 text-zinc-400'>({category})</small>
            </h1>
            <div className="flex items-center w-[80%]">
                <Topnav/>
                <Dropdown title="Cartegory" options={["on_the_air","popular","top_rated","airing_today"]} func={(e)=> setCategory(e.target.value)}/>
            </div>
        </div>
        <InfiniteScroll dataLength={tv.length} next={GetTv}
        hasMore={hasMore}
        loader={<h1 className='w-screen bg-[#28283c]'>Loading</h1>}>
            <Cards data={tv} title="tv"/>
        </InfiniteScroll>
    </div>
  ):<Loading/>
}

export default TvShow