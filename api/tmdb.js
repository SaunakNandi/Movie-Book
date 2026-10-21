/* eslint-env node */
import axios from "axios";

export default async function handler(req, res) {
  const { route, ...queryParams } = req.query;
  if (!route) return res.status(400).json("route not found");
  try {
    const response = await axios.get(`https://api.themoviedb.org/3${route}`, {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${process.env.TMDB_SECRET_TOKEN}`,
        accept: "application/json",
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log("error ", error.message);
    res.status(error?.response?.status || 500).json({ error: error.message });
  }
}
