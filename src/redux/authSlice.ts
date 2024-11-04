import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface IAuth {
  token: string | null
}

const initialState:IAuth = {
  token : localStorage.getItem("token"),
}


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers :{
    setToken : (state,action:PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem("token",action.payload)
    },
    logout : (state) => {
      state.token = null;
      localStorage.removeItem("token");
    }
  },
  //optional builders for later
  // extraReducers(builder) {
  // },

})

export const { setToken,logout } = authSlice.actions;
export default authSlice.reducer;
