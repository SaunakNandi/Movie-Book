import { all, call, put, takeLatest } from "redux-saga/effects";
import { loadmovie } from "../reducers/movieSlice";
import axios from "axios";
import { fetchMovieRequest } from "../actions/movie-actions";

function* fetchMovieWorker(action) {
  const id = action.payload;
  try {
    const [
      detail,
      externalId,
      recommendations,
      similar,
      videos,
      watchProviders,
      credits,
    ] = yield all([
      call(axios.get, `/movie/${id}`),
      call(axios.get, `/movie/${id}/external_ids`),
      call(axios.get, `/movie/${id}/recommendations`),
      call(axios.get, `/movie/${id}/similar`),
      call(axios.get, `/movie/${id}/videos`),
      call(axios.get, `/movie/${id}/watch/providers`),
      call(axios.get, `/movie/${id}/credits`),
    ]);

    const casts = credits.data.cast
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 16);
    let ultimatedetails = {
      detail: detail.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchProviders: watchProviders.data.results.IN,
      casts: casts,
    };

    yield put(loadmovie(ultimatedetails));
  } catch (error) {
    console.log("Saga movie fetch user ", error);
  }
}

export function* watchMovieSaga() {
  yield takeLatest(fetchMovieRequest, fetchMovieWorker);
}
