import { createSlice } from "@reduxjs/toolkit";


const authslice=createSlice({
    name:"authslice",
    initialState:{
        userdata: JSON.parse(localStorage.getItem("userdata"))||null
    },
    reducers:{
        adduser:(state,action)=>{
            state.userdata=action.payload
            localStorage.setItem("userdata",JSON.stringify(action.payload))
        },
        
        removeuser:(state)=>{
            state.userdata=null
            localStorage.removeItem("userdata")
           
        }

    }
})
export const {adduser,removeuser}=authslice.actions
export default  authslice.reducer