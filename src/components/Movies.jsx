import React, { useEffect, useState, Suspense } from 'react'
import Cards from './partials/Cards'
import Loading from './Loading'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'

const Topnav=React.lazy(()=>import('./partials/Topnav'))
const Dropdown=React.lazy(()=>import('./partials/Dropdown'))
const InfiniteScroll=React.lazy(()=>import('react-infinite-scroll-component'))

const Movies = () => {
    const [category,setCategory]=useState("now_playing")
    const [sortOption,setsortOption]=useState("none")
    const [movies,setMovies]=useState([])
    const [page,setPage]=useState(1)
    const [hasMore,sethasMore]=useState(true)
    const navigate=useNavigate()

    const GetMovies=async()=>{
        try{
            const {data}=await axios.get(`/movie/${category}?page=${page}`)
            // setMovies(data.results)
            if(data.results.length>0)
            { 
                setMovies((prevState)=>[...prevState,...data.results])
                setPage(page+1)
            }
            else
                sethasMore(false)
            
            // console.log(data.results);
        }
        catch(err)
        {
            console.log("Error ",err)
        }
    }

    const refreshHandler=()=>{
        if(movies.length===0)
            GetMovies()
        else
        {
            setPage(1)
            setMovies([])
            GetMovies()
        }
    }

    useEffect(()=>{
        refreshHandler()  // you can uncheck the above and it still works. The instructor has actually done in this way
    },[category,sortOption])
  return  movies.length>0 ? (
    
    <div className='w-screen h-screen bg-[#28283c]'>
        <div className="px-[3%] w-full flex items-center justify-between">
            <h1 className='w-[20%] text-3xl text-zinc-400 font-semibold'>
                <i onClick={()=>navigate(-1)}
                className="mr-2 ri-arrow-left-line hover:text-[#6556CD] cu"></i> 
                Movies<span className='ml-2 text-zinc-400'>({category})</span>
            </h1>
            <div className="flex items-center w-[80%]">
                <Suspense fallback={<div>Loading...</div>}>
                    <Topnav/>
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <Dropdown title="Cartegory" options={["popular","top_rated","now_playing","upcoming"]} func={(e)=> setCategory(e.target.value)}/>
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <Dropdown title="Sort by" options={["rating -(high - low)","rating -(low - high)"]} func={(e)=> setsortOption(e.target.value)}/>
                </Suspense>
            </div>
        </div>
        <InfiniteScroll dataLength={movies.length} next={GetMovies}
        hasMore={hasMore}
        loader={<h1 className='w-screen bg-[#28283c]'>Loading</h1>}>
            <Cards data={movies} title="movie" options={sortOption}/>
        </InfiniteScroll>
    </div>
  ):<Loading/>
}

export default Movies