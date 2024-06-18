import axios from 'axios'

const instance=axios.create({
    baseURL:'https://api.themoviedb.org/3',
    
    headers:{
        accept:"application/json",
        Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjdmNmU4MDY1YzdkNGNkYmMwYmFkNmI1ZmZhYzA1NiIsInN1YiI6IjY2M2NmZTJlZDEzYTMzNDFjZTc4YWNlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LepURE6FMKJSN7RBAk6AhKBgsTFAV5q71FQz2rJ-klo',

      
    }
})
export default instance