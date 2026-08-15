import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { loadseason } from "../reducers/seasonsSlice";
import { fetchSeasonDetails } from "../actions/season-action";

function* SeasonWorker(action) {
  const { series_id, season_no } = action.payload;
  try {
    const [detail, externalId, videos, watchProviders] = yield all([
      yield call(
        axios.get,
        `/tv/${series_id}/season/${season_no}/external_ids`,
      ),
      yield call(axios.get, `/tv/${series_id}/season/${season_no}/videos`),
      yield call(
        axios.get,
        `/tv/${series_id}/season/${season_no}/watch/providers`,
      ),
      yield call(axios.get, `/tv/${series_id}/season/${season_no}`),
    ]);
    let ultimatedetails = {
      detail: detail.data,
      externalId: externalId.data,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchProviders: watchProviders.data.results.IN,
    };
    yield put(loadseason(ultimatedetails));
  } catch (error) {
    console.log("error ", error);
  }
}

export function* watchSeasonSaga() {
  yield takeLatest(fetchSeasonDetails, SeasonWorker);
}
