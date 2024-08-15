// coordinatesSlice.js
import { createSlice } from '@reduxjs/toolkit';



const coordinatesSlice = createSlice({
  name: 'coordinates',
  initialState:{
    lat: 28.5355161,
    lng: 77.3910265,
  },
  reducers: {
    setCoordinates: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const { setCoordinates } = coordinatesSlice.actions;
export default coordinatesSlice.reducer;
