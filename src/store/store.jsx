import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieSlice";
import personReducer from "./reducers/personSlice";
import tvReducer from "./reducers/tvSlice";
import seasonReducer from "./reducers/seasonsSlice";
import userReduer from "./reducers/userSlice";
import rootSaga from "./root-saga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
    season: seasonReducer,
    user: userReduer,
  },
  // Added implicit return here:
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the saga middleware AFTER configureStore
sagaMiddleware.run(rootSaga);
