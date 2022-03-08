/*
This is the place to create the reducer
By using @reduxjs/toolkit, you can create a reducer easily!
Here we create a slice that accepts an initial state,
an object full of reducer functions,
and a "slice name",
and automatically generates action creators
and action types that correspond to the reducers 
and state
*/

import { createSlice } from '@reduxjs/toolkit';
import changeBarHeight from '../algorithms/changeBarHeight';
const initialState = { animationData: [], speed: 10 };
const animationSlice = createSlice({
  name: 'animation',
  initialState,
  reducers: {
    changeSpeed: (state, action) => {
      console.log(action.payload);
      state.speed = action.payload;
    },
    storeAnimation: (state, action) => {
      state.animationData = action.payload;
      // console.log(state.animationData);
    },
    playAnimation: (state, action) => {
      changeBarHeight(action.payload, state.speed);
    },
  },
});
export const animationAction = animationSlice.actions;
export default animationSlice;
