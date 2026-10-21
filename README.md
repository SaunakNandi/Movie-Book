# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

How React Talks to TMDB: The Serverless API Proxy method

Here is the exact step-by-step journey (check tmdb.js and axios.js)-

1. The Frontend Request (React -> Vercel)
   Your React component runs axios.get('/movie/popular'). Your new interceptor instantly rewrites it to /api/tmdb?route=/movie/popular.
   Because this URL doesn't start with https://..., your browser assumes it's a local route and sends the request to your own Vercel website's backend server, completely skipping TMDB for now.
2. The Extraction (Inside Vercel)
   Your api/tmdb.js file catches that incoming request. The very first line of your handler function is const { route, ...queryParams } = req.query;. This extracts the route variable from the URL, so the variable route now perfectly equals "/movie/popular".
3. The Backend Request (Vercel -> TMDB)
   This is where [https://api.themoviedb.org/3$](https://api.themoviedb.org/3$){route} comes into play! 🎬
   Your serverless function initiates a brand new, second Axios request from its secure server. It stitches the TMDB base URL together with the route it just extracted, transforming it into [https://api.themoviedb.org/3/movie/popular](https://api.themoviedb.org/3/movie/popular). It slaps your hidden API key onto this request and fires it off to the official TMDB servers. 🚀
4. The Handoff (TMDB -> Vercel -> React)
   TMDB receives the secure request, validates your API key, and sends the movie data back to Vercel. Finally, your Vercel function uses res.status(200).json(...) to hand that exact data straight back to your waiting React component! 📦
   To summarize: React asks Vercel, and Vercel secretly asks TMDB. React never knows TMDB's real URL, and TMDB never knows React is the one asking! 🕵️‍♂️
