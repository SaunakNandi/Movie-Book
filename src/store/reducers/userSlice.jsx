import { createSlice } from "@reduxjs/toolkit"

const initialState={
    user:null,
    popup:false,
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        handleLoginPopUp(state,action)
        {
            state.popup=action.payload
        }
    }
})

export const {handleLoginPopUp}=userSlice.actions
export default userSlice.reducer