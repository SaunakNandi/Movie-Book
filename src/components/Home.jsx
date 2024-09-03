import React, { useState, useEffect,Suspense } from "react";
import Sidenav from "./partials/Sidenav";
import axios from "../utils/axios";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginPopUp } from "../store/reducers/userSlice";
import { LoginPopUp } from "./partials/Login/LoginPopUp";
import Header from "./partials/Header";
const HorizontalCards=React.lazy(()=>import("./partials/HorizontalCards"))
const Dropdown=React.lazy(()=>import("./partials/Dropdown"))
const Topnav=React.lazy(()=>import("./partials/Topnav"))
// const Header=React.lazy(()=>import("./partials/Header"))

const Home = () => {
  document.title = "Movie Book";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("movie");
  const dispatch = useDispatch();
  const popup = useSelector((store) => store.user.popup);
  
  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/movie/week?page=1`);
      
      // startTransition(()=>{
      // })
      wallpaper? setWallpaper((prevState) => [...prevState, ...data.results])
        : setWallpaper(data.results);
      // console.log(data.results)
    } catch (err) {
      console.log("Error ", err);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      // startTransition(()=>{
      // })
      setTrending(data.results);
      GetHeaderWallpaper();
    } catch (err) {
      console.log("Error ", err);
    }
  };

  const getTokenValue = (val) => {
    const token = val + "="; // cookie is written as authToken=X;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");
    // console.log(cookies);
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(token) === 0) {
          return cookie.substring(token.length, cookie.length);
        }
      }

  };
  useEffect(() => {
    GetTrending();
  }, [category]);
  useEffect(() => {
    GetHeaderWallpaper();
  }, []);
  useEffect(() => {
    // const authToken=Cookies.get('authToken');

    const authToken = getTokenValue("authToken");
    // console.log(authToken);
    if (!authToken && !popup) {
      setTimeout(() => {
        dispatch(handleLoginPopUp(true));
      }, 3000);
    }
  }, []);
  return wallpaper && trending ? (
    <>
      <Sidenav />
        {
          popup && <LoginPopUp/>
        }
      <div className="w-[80%] overflow-auto overflow-x-hidden">
        <Suspense fallback={<div></div>}>
          <Topnav />
        </Suspense>
          <Header wallpaper={wallpaper} />
        <div className="flex justify-between p-5">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
          <Suspense fallback={<div></div>}>
            <Dropdown
              title="Filter"
              options={["tv", "movie", "all"]}
              func={(e) => setCategory(e.target.value)}
            />
          </Suspense>
        </div>
        <Suspense fallback={<div></div>}>
          <HorizontalCards trend={trending} />
        </Suspense>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
