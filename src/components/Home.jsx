import React, { useState,useEffect } from 'react';
import Sidenav from './partials/Sidenav';
import Topnav from './partials/Topnav';
import axios from '../utils/axios'
import Header from './partials/Header';
import HorizontalCards from './partials/HorizontalCards';
import Dropdown from './partials/Dropdown'
import Loading from './Loading';

const Home = () => {
    document.title='Movie Book'
    const [wallpaper, setWallpaper]=useState(null)
    const [trending, setTrending]=useState(null)
    const [category,setCategory] =useState("movie")
    const [page,setPage] = useState(1)
    const set_page=()=>{
        console.log("called")
        setPage(page+1)
    }
    const GetHeaderWallpaper=async()=>{
        try{
            const {data}=await axios.get(`/trending/movie/day?page=${page}`)

            wallpaper? setWallpaper((prevState=> [...prevState,...data.results]))
            :
            setWallpaper(data.results)
            // console.log(data.results)
        }
        catch(err)
        {
            console.log("Error ",err)
        }
    }

    const GetTrending=async()=>{
        try{
            const {data}=await axios.get(`/trending/${category}/day`)
            setTrending(data.results)
        }
        catch(err)
        {
            console.log("Error ",err)
        }
    }
    useEffect(()=>{
        GetTrending()
        // !wallpaper && 
        GetHeaderWallpaper()
    },[category,page])
    return wallpaper  && trending? (
        <>
            <Sidenav/>
            <div className='w-[80%] overflow-auto overflow-x-hidden'>
                <Topnav/>
                <Header wallpaper={wallpaper} set_page={set_page}/>
                <div className="flex justify-between p-5">
                    <h1 className='text-3xl font-semibold text-zinc-400'>Trending</h1>
                    <Dropdown title="Filter" options={['tv','movie', 'all']} func={(e)=>setCategory(e.target.value)}/>
                </div>
                <HorizontalCards trend={trending}/>
            </div>
        </>
    ):<Loading/>
}

export default Home;
