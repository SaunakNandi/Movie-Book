import axios from "axios";

const instance = axios.create({
  baseURL: "/api/tmdb",
});
instance.interceptors.request.use((config) => {
  config.url = `?route=${config.url}`;
  return config;
});

export default instance;
