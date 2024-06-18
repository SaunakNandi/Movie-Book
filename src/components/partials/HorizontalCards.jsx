import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import no_image from '../../assets/no_image.png'
const HorizontalCards = ({trend,category}) => {
    const uniqueObjects = {};
    console.log(trend)
    trend.forEach(obj => {
        uniqueObjects[obj.id] = obj;
    });
    const uniqueArrayOfObjects = Object.values(uniqueObjects)
    console.log(uniqueArrayOfObjects)

    const cardVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
      };

    return (
        
            <div className="w-[100%] flex overflow-y-hidden mb-5 p-3">
                {uniqueArrayOfObjects.length>0 ? uniqueArrayOfObjects.map((t,i)=> (
                    <motion.div
                    key={t.id}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={cardVariants}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="min-w-[20%] h-[50vh] mr-5 mb-5 bg-zinc-900 overflow-y-auto"
                  >
                      <Link to={`/${t.media_type || category}/details/${t.id}`} className="min-w-[20%] mr-5 mb-5 bg-zinc-900 overflow-y-auto" key={t.id}>
                          <img 
                          src={(t.backdrop_path || t.poster_path || t.profile_path)? `https://image.tmdb.org/t/p/original${t.backdrop_path || t.poster_path || t.profile_path}`
                              : no_image} 
                          className='w-full h-[55%] object-center'
                          alt={t.original_title || t.title || t.original_name || t.name}  />
                          <div className="text-white p-3">
  
                              <h1 className='font-semibold'>
                                  {t.original_name || t.title || t.original_title || t.name} 
                              </h1>
                              {
                                t.overview &&
                                (<p className='mt-2 mb-1 text-sm'>{t.overview.slice(0,50)}...
                              <span className='text-blue-400'> more</span></p>)
                                }
                                {
                                    t.character &&
                                    <h1 className='font-semibold mt-2'>Character - {t.character}</h1>
                                }
                          </div>
                      
                      </Link>
                    </motion.div>
                  )): <h1 className='text-3xl text-white font-black text-center mt-5'>Nothing to Show</h1>}
                    
            </div>
  )
}

export default HorizontalCards