import { configureStore } from "@reduxjs/toolkit";
import toogleslice from "./toogleslice";
import cartslice from "./cartslice";
import coordslice from "./coordslice";
import filterslice from "./filterslice";
import authslice from "./auth"
const store= configureStore({
    reducer:{
   toogle:toogleslice,
   cartslice,//this are used when key and value both name are same
   coordinates: coordslice,
   filterslice:filterslice,
   authslice
    }
})
 
export default store 