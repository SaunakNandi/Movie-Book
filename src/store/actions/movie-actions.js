export const movie_fetcher = "/fetch-movie";

export const fetchMovieRequest = (id) => {
  return {
    type: movie_fetcher,
    payload: id,
  };
};
