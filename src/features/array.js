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
import createRandomArray from '../Algorithms/createRandomArray';
const initialStateValue = [];
export const arraySlice = createSlice({
  name: 'array',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    resetArray: (state, action) => {
      state.value = createRandomArray(action.payload);
    },
  },
});
export const { resetArray } = arraySlice.actions;
export default arraySlice.reducer;
