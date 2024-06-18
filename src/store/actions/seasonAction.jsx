import axios from '../../utils/axios'
import { loadseason } from '../reducers/seasonsSlice'
export {removeseason} from '../reducers/seasonsSlice'

export const asyncloadseason=(series_id,season_no)=>async(dispatch,getState)=>{
    try{
        const detail=await axios.get(`/tv/${series_id}/season/${season_no}`)
        const externalId=await axios.get(`/tv/${series_id}/season/${season_no}/external_ids`)
        const videos=await axios.get(`/tv/${series_id}/season/${season_no}/videos`)
        const watchProviders=await axios.get(`/tv/${series_id}/season/${season_no}/watch/providers`)
        let ultimatedetails={
            detail:detail.data,
            externalId:externalId.data,
            videos:videos.data.results.find(m=> m.type==='Trailer'),
            watchProviders:watchProviders.data.results.IN
        }
        // console.log(detail)  
        // console.log(externalId)  
        // console.log(videos)  
        console.log(ultimatedetails)
        dispatch(loadseason(ultimatedetails))
    }
    catch(err)
    {
        console.log("Error ",err)
    }
}