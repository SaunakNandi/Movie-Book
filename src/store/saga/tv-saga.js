import axios from "../../utils/axios";
import { call, takeLatest, all, put } from "redux-saga/effects";
import { loadtv } from "../reducers/tvSlice";
import { fetchTVDetails } from "../actions/tv-actions";

function* fetchTvWorker(action) {
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
      call(axios.get, `/tv/${id}`),
      call(axios.get, `/tv/${id}/external_ids`),
      call(axios.get, `/tv/${id}/recommendations`),
      call(axios.get, `/tv/${id}/similar`),
      call(axios.get, `/tv/${id}/videos`),
      call(axios.get, `/tv/${id}/watch/providers`),
      call(axios.get, `/tv/${id}/credits`),
    ]);
    const casts = (credits?.data?.cast ?? [])
      .filter((item) => typeof item.popularity != "undefined")
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 25);
    let ultimatedetails = {
      detail: detail.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos?.data?.results?.find((m) => m.type === "Trailer"),
      watchProviders: watchProviders?.data?.results?.IN || null,
      casts: casts,
    };
    yield put(loadtv(ultimatedetails));
  } catch (error) {
    console.log("error ", error);
  }
}

export function* watchtvSaga() {
  yield takeLatest(fetchTVDetails, fetchTvWorker);
}
