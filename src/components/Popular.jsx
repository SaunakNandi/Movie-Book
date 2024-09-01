import React, { useEffect, useState, Suspense } from 'react'
import axios from '../utils/axios'
import Cards from './partials/Cards'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'

const Topnav=React.lazy(()=>import('./partials/Topnav'))
const Dropdown=React.lazy(()=>import('./partials/Dropdown'))
const InfiniteScroll=React.lazy(()=>import('react-infinite-scroll-component'))

const popular = () => {
    const [category,setCategory]=useState("movie")
    const [popular,setPopular]=useState([])
    const [page,setPage]=useState(1)
    const [hasMore,sethasMore]=useState(true)
    const navigate=useNavigate()
    document.title='Popular '+category.toUpperCase()
    const GetPopular=async()=>{
        try{
            const {data}=await axios.get(`${category}/popular?page=${page}`)
            // setPopular(data.results)
            console.log(data.results)
            if(data.results.length>0)
            {
                // for this logic we have to do reset popular[] whenever the catergory or duration get changed 
                setPopular((prevState)=>[...prevState,...data.results])
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
        if(popular.length===0)
            GetPopular()
        else
        {
            // console.log("called now")
            // while changing category or duration this will set the page to 1 and empty the popular[].
            // You can uncheck it too se the difference.
            setPage(1)
            setPopular([])
            GetPopular()
        }
    }

    useEffect(()=>{
        // setPage(1)
        // setPopular([])
        // GetPopular()
        refreshHandler()  // you can uncheck the above and it still works. The instructor has actually done in this way
    },[category])
  return  popular ? (
    <div className='w-screen h-screen bg-[#28283c]'>
        <div className="px-[3%] w-full flex items-center justify-between">
            <h1 className='w-[20%] text-3xl text-zinc-400 font-semibold'>
                <i onClick={()=>navigate(-1)}
                className="mr-2 ri-arrow-left-line hover:text-[#6556CD] cursor-pointer"></i> 
                Popular
            </h1>
            <div className="flex items-center w-[80%]">
                <Suspense fallback={<div></div>}>
                    <Topnav/>
                    <Dropdown title="Cartegory" options={["movie","tv"]} func={(e)=> setCategory(e.target.value)}/>
                    <div className="w-[2%]"></div>
                </Suspense>
            </div>
        </div>
        <Suspense fallback={<div></div>}>
            <InfiniteScroll dataLength={popular.length} next={GetPopular}
            hasMore={hasMore}
            loader={<h1 className='w-screen bg-[#28283c]'></h1>}>
                <Cards data={popular} title={category}/>
            </InfiniteScroll>
        </Suspense>
    </div>
  ):<Loading/>
}

export default popular