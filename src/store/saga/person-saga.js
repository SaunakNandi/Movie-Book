import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { loadperson } from "../reducers/personSlice";
import { fetchActorDetails } from "../actions/person-actions";

function* personWorker(action) {
  const id = action.payload;
  try {
    const [detail, externalId, combinedCredits, tvCredits, movieCredits] =
      yield all([
        call(axios.get, `/person/${id}`),
        call(axios.get, `/person/${id}/external_ids`),
        call(axios.get, `/person/${id}/combined_credits`),
        call(axios.get, `/person/${id}/tv_credits`),
        call(axios.get, `/person/${id}/movie_credits`),
      ]);
    let ultimatedetails = {
      detail: detail.data,
      externalId: externalId.data,
      combinedCredits: combinedCredits.data,
      movieCredits: movieCredits.data,
      tvCredits: tvCredits.data,
    };
    yield put(loadperson(ultimatedetails));
  } catch (error) {
    console.error("error ", error);
  }
}

export function* watchPersonSaga() {
  yield takeLatest(fetchActorDetails, personWorker);
}
