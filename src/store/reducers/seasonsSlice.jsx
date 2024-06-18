import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null,
}

export const seasonSlice = createSlice({
  name: 'season',
  initialState,
  reducers: {
    loadseason:(state,action)=>{
      state.info=action.payload
    },
    removeseason:(state,action)=>{  // to unmount the data
      state.info=null
    }
  },

})

// Action creators are generated for each case reducer function
export const { loadseason,removeseason } = seasonSlice.actions

export default seasonSlice.reducer