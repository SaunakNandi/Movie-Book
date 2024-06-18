import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import left_arrow from '../assets/left_arrow.gif'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import axios from '../utils/axios'
import Cards from './partials/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
    const [category,setCategory]=useState("all")
    const [duration,setDuration]=useState("day")
    const [trending,setTrending]=useState([])
    const [page,setPage]=useState(1)
    const [hasMore,sethasMore]=useState(true)
    document.title='Trending '+category.toUpperCase()+" of the "+duration
    const navigate=useNavigate()

    const GetTrending=async()=>{
        try{
            const {data}=await axios.get(`/trending/${category}/${duration}?page=${page}`)
            // setTrending(data.results)
            console.log(data.results.length)
            console.log(page)
            if(data.results.length>0)
            {
                // for this logic we have to do reset trending[] whenever the catergory or duration get changed 
                setTrending((prevState)=>[...prevState,...data.results])
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
        if(trending.length===0)
            GetTrending()
        else
        {
            // console.log("called now")
            // while changing category or duration this will set the page to 1 and empty the trending[].
            // You can uncheck it too se the difference.
            setPage(1)
            setTrending([])
            GetTrending()
        }
    }

    useEffect(()=>{
        // setPage(1)
        // setTrending([])
        // GetTrending()
        refreshHandler()  // you can uncheck the above and it still works. The instructor has actually done in this way
    },[category,duration])
  return  trending ? (
    <div className='w-screen h-screen bg-[#28283c]'>
        <div className="px-[3%] w-full flex items-center justify-between">
            <h1 className='w-[20%] text-3xl text-zinc-400 font-semibold'>
                <i onClick={()=>navigate(-1)}
                className="mr-2 ri-arrow-left-line hover:text-[#6556CD] cu"></i> 
                Trending
            </h1>
            <div className="flex items-center w-[80%]">
                <Topnav/>
                <Dropdown title="Cartegory" options={["movie","tv","all"]} func={(e)=> setCategory(e.target.value)}/>
                <div className="w-[2%]"></div>
                <Dropdown title="Duration" options={["week","day"]} func={(e)=> setDuration(e.target.value)}/>
            </div>
        </div>
        <InfiniteScroll dataLength={trending.length} next={GetTrending}
        hasMore={hasMore}
        loader={<h1 className='w-screen bg-[#28283c]'>Loading</h1>}>
            <Cards data={trending} title={category}/>
        </InfiniteScroll>
    </div>
  ):<Loading/>
}

export default Trending