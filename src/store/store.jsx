import { configureStore } from '@reduxjs/toolkit'
import  movieReducer  from './reducers/movieSlice'
import  personReducer  from './reducers/personSlice'
import  tvReducer  from './reducers/tvSlice'
import seasonReducer from './reducers/seasonsSlice'
import userReduer from './reducers/userSlice'

export const store = configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer,
    person:personReducer,
    season:seasonReducer,
    user:userReduer
  },
})