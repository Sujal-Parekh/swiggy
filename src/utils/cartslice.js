import { createSlice } from "@reduxjs/toolkit";


const cartslice= createSlice({
  name:"cartslice",
  initialState: {
    cartitems:JSON.parse(localStorage.getItem("cartdata"))||[],
    resinfo:JSON.parse(localStorage.getItem("resinfo")) || []
  },
  reducers:{
    addtocart:(state,action)=>{
        // console.log(action.payload);
        const {info,resinfo}=action.payload
        // console.log("cartslice resinfo",resinfo)
        // setCartdata((prev)=>[...prev,info]);
         state.cartitems=[...state.cartitems , info ]
        state.resinfo = resinfo;
        localStorage.setItem("cartdata",JSON.stringify(state.cartitems))
        localStorage.setItem("resinfo",JSON.stringify(resinfo))
    },
    deleteitem:(state,action)=>{
      state.cartitems=action.payload
      localStorage.setItem("cartdata",JSON.stringify(action.payload))

    },
    clearcart:(state)=>{
   state.cartitems=[]
   state.resinfo=[]
   localStorage.clear()
  //  localStorage.removeitem("resinfo")

    }
  }

})
export const {addtocart,deleteitem,clearcart}= cartslice.actions
export default cartslice.reducer