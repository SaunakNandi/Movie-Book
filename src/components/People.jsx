import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import left_arrow from '../assets/left_arrow.gif'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import axios from '../utils/axios'
import Cards from './partials/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component';

const People = () => {
    const [people,setPeople]=useState([])
    const [page,setPage]=useState(1)
    const [hasMore,sethasMore]=useState(true)
    document.title='Casts'
    const navigate=useNavigate()
    let counter=page
    const GetPeople=async()=>{
        try{
            const {data}=await axios.get(`/person/popular?page=${page}`)
            // setPeople(data.results)
            if(data.results.length>0)
            {
                // for this logic we have to do reset people[] whenever the catergory or duration get changed 
                setPeople((prevState)=>[...prevState,...data.results])
                setPage(page+1)
            }
            else
                sethasMore(false)
        }
        catch(err)
        {
            console.log("Error ",err)
        }
    }

    const refreshHandler=()=>{
        if(people.length===0)
            GetPeople()
        else
        {
            setPage(1)
            setPeople([])
            GetPeople()
        }
    }

    useEffect(()=>{
        refreshHandler()  // you can uncheck the above and it still works. The instructor has actually done in this way
    },[])
  return  people.length>0 ? (
    <div className='w-screen h-screen bg-[#28283c]'>
        <div className="px-[3%] w-full flex items-center justify-between">
            <h1 className='w-[20%] text-3xl text-zinc-400 font-semibold'>
                <i onClick={()=>navigate(-1)}
                className="mr-2 ri-arrow-left-line hover:text-[#6556CD] cu"></i> 
                Stars
            </h1>
            <div className="flex items-center w-[80%]">
                <Topnav/>
            </div>
        </div>
        <InfiniteScroll dataLength={people.length} next={GetPeople}
        hasMore={hasMore}
        loader={<h1 className='w-screen bg-[#28283c]'>Loading</h1>}>
            <Cards data={people} title="person"/>
        </InfiniteScroll>
    </div>
  ):<Loading/>
}

export default People