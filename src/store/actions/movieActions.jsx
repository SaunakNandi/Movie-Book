import axios from '../../utils/axios'
import {loadmovie} from '../reducers/movieSlice'
export {removemovie} from '../reducers/movieSlice'

export const asyncloadmovie=(id)=>async(dispatch,getState)=>{
    try{
        const detail=await axios.get(`/movie/${id}`)
        const externalId=await axios.get(`/movie/${id}/external_ids`)
        
        const recommendations=await axios.get(`/movie/${id}/recommendations`)
        const similar=await axios.get(`/movie/${id}/similar`)
        const videos=await axios.get(`/movie/${id}/videos`)
        const watchProviders=await axios.get(`/movie/${id}/watch/providers`)
        const credits=await axios.get(`/movie/${id}/credits`)
        const casts=credits.data.cast.sort((a,b)=> b.popularity - a.popularity).slice(0,16)
        let ultimatedetails={
            detail:detail.data,
            externalId:externalId.data,
            recommendations:recommendations.data.results,
            similar:similar.data.results,
            videos:videos.data.results.find(m=> m.type==='Trailer'),
            watchProviders:watchProviders.data.results.IN,
            casts:casts
        }
        // console.table("ultimatedetails ",ultimatedetails)  
        dispatch(loadmovie(ultimatedetails))
    }
    catch(err)
    {
        console.log("Error ",err)
    }
}