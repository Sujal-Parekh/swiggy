import { createSlice } from "@reduxjs/toolkit";


const toogleslice=createSlice({
     name:"toogleslice",
     initialState:{
        searchtoggle:false,
        logintoggle:false,
        isdiffer:false,
        
        similarresdish:{
        issimilarresdishes:false,
        city:"",
        reslocation:"",
        resid:"",
        itemid:""
      
        }
     },
     reducers:{
         stoogle:(state)=>{ 
            state.searchtoggle=!state.searchtoggle
           
         },
         logintoggle:(state)=>{
            state.logintoggle=!state.logintoggle

         },
         isdiffertoggle:(state)=>{
            state.isdiffer=!state.isdiffer

         },
         
         setsimilarresdish:(state,action)=>{
            state.similarresdish=action.payload

         },
         resetsimilarresdish:(state)=>{
            state.similarresdish={
               issimilarresdishes:false,
               city:"",
               reslocation:"",
               resid:"",
               itemid:""
             
               }

         }
     }
})
export const {stoogle,logintoggle,isdiffertoggle,setsimilarresdish,resetsimilarresdish}=toogleslice.actions
export default toogleslice.reducer