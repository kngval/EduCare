import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface IAuth {
  token: string | null
}

const initialState:IAuth = {
  token : localStorage.getItem("token")
}


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers :{
    setToken : (state,action:PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem("token",action.payload)
    },
    removeToken : (state) => {
      state.token = null;
    }
  },
  //optional builders for later
  // extraReducers(builder) {
  // },

})

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
