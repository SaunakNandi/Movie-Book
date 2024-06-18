import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import no_image from "../../assets/no_image.png";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState(null);
  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      //   console.log(data.results)
      setSearches(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);
  return (
    <div className="w-[80%] h-[10vh] relative flex mx-auto items-center">
      <i className="text-3xl text-zinc-400 ri-search-line"></i>
      <input
        type="text"
        className="w-[50%] mx-9 p-5 px-2 text-xl outline-none border-none bg-transparent text-white"
        placeholder="search movies/tv shows"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.length > 0 && (
        <i
          onClick={(e) => setQuery("")}
          className="text-zinc-400 text-3xl ri-close-fill"
        ></i>
      )}

      <div className="z-[99] absolute bg-zinc-200 w-[50%] max-h-[50vh] top-[90%] left-[5%] overflow-auto rounded">
        {searches &&
          searches.map((x, i) => (
            <Link to={`/${x.media_type}/details/${x.id}`}
              key={i}
              className="text-zinc-700 font-semibold w-[100%] p-5 flex justify-start items-center border-b-2 border-zinc-100 hover:text-black hover:bg-zinc-300 duration-300 shadow-lg"
            >
              <img
                src={
                  x.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${x.backdrop_path}`
                    : no_image
                }
                alt={x.original_title || x.title || x.original_name || x.name}
                className="w-[10vh] h-[10vh] object-cover rounded mr-5"
              />
              <span>
                {x.original_title || x.title || x.original_name || x.name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Topnav;
