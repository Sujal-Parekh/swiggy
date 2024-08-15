import { createSlice } from "@reduxjs/toolkit";


const filterslice   = createSlice({
    name: 'filterslice',
    initialState:{
        filterval:null,
    },
   reducers:{
    setfiltervalue : (state,actions)=>{
        state.filterval = actions.payload;
      
    }
   }
})
export const {setfiltervalue}=filterslice.actions;
export default filterslice.reducer