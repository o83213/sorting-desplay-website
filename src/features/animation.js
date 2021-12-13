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
import changeBarHeight from '../Algorithms/changeBarHeight';
import recoverArray from '../Algorithms/recoverArray';
const initialStateValue = { speed: 10 };
export const animationSlice = createSlice({
  name: 'animation',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    changeSpeed: (state, action) => {
      state.value.speed = action.payload;
    },
    playAnimation: (state, action) => {
      changeBarHeight(action.payload, state.value.speed);
    },
    setInitialArray: (state, action) => {
      recoverArray(action.payload);
    },
  },
});
export const { changeSpeed } = animationSlice.actions;
export const { playAnimation } = animationSlice.actions;
export const { setInitialArray } = animationSlice.actions;
export default animationSlice.reducer;
