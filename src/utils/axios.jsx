import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTJmNDc4ZmIwNTkzZGUwYTM1ODhkOTYxODg4OGUwYyIsIm5iZiI6MTYzNTkxODk5OS43NTksInN1YiI6IjYxODIyNDk3ZTU0ZDVkMDAyYzk4YWQwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7le2xsjKzBuxic8Ni7T7bPFhQNuCk_KbO4tJL2pVIJc",
  },
});
export default instance;
