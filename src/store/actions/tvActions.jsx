import axios from '../../utils/axios'
import {loadtv} from '../reducers/tvSlice'

export {removetv} from '../reducers/tvSlice'

export const asyncloadtv=(id)=>async(dispatch,getState)=>{
    try{
        const detail=await axios.get(`/tv/${id}`)
        const externalId=await axios.get(`/tv/${id}/external_ids`)
        const recommendations=await axios.get(`/tv/${id}/recommendations`)
        const similar=await axios.get(`/tv/${id}/similar`)
        const videos=await axios.get(`/tv/${id}/videos`)
        const watchProviders=await axios.get(`/tv/${id}/watch/providers`)
        const credits=await axios.get(`/tv/${id}/credits`)
        const casts=credits.data.cast.sort((a,b)=> b.popularity - a.popularity).slice(0,25)
        let ultimatedetails={
            detail:detail.data,
            externalId:externalId.data,
            recommendations:recommendations.data.results,
            similar:similar.data.results,
            videos:videos.data.results.find(m=> m.type==='Trailer'),
            watchProviders:watchProviders.data.results.IN,
            casts:casts
        }
        console.table("ultimatedetails ",ultimatedetails)  
        dispatch(loadtv(ultimatedetails))
    }
    catch(err)
    {
        console.log("Error ",err)
    }
}