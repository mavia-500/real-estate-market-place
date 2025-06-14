import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state, action) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      console.log(action.payload);
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart:(state,action)=>{
        state.loading=true;
    },
    updateUserSuccess:(state,action)=>{
        state.currentUser=action.payload;
        state.loading=false;
        state.error=null
    },
    updateUserFailure:(state,action)=>{
        
        state.loading=false;
        state.error=action.payload
    },
    deleteUserStart:(state,action)=>{
        state.loading=true;
    },
    deleteUserSuccess:(state,action)=>{
        state.currentUser=null;
        state.loading=false;
        state.error=null
    },
    deleteUserFailure:(state,action)=>{
        
        state.loading=false;
        state.error=action.payload
    },

    signOutUserStart:(state,action)=>{
        state.loading=true;
    },
    signOutUserSuccess:(state,action)=>{
        state.currentUser=null;
        state.loading=false;
        state.error=null
    },
    signOutUserFailure:(state,action)=>{
        
        state.loading=false;
        state.error=action.payload
    },
  },
});

export const { signInStart, signInSuccess, signInFailure,updateUserStart,updateUserSuccess,updateUserFailure ,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutUserFailure,signOutUserStart,signOutUserSuccess} = userSlice.actions;

export default userSlice.reducer;
