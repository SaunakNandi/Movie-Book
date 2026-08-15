import { all, fork } from "redux-saga/effects";
import { watchMovieSaga } from "./saga/movie-saga";
import { watchtvSaga } from "./saga/tv-saga";
import { watchPersonSaga } from "./saga/person-saga";
import { watchSeasonSaga } from "./saga/season-saga";

export default function* rootSaga() {
  yield all([
    fork(watchMovieSaga),
    fork(watchtvSaga),
    fork(watchPersonSaga),
    fork(watchSeasonSaga),
  ]);
}
