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
import sortByMethod from '../algorithms/sortByMethod';

const initialState = { sortedResult: [], sortedAnimation: [], method: '' };
const sortingBoxSlice = createSlice({
  name: 'sortingBox',
  initialState,
  reducers: {
    changeMethod: (state, action) => {
      state.method = action.payload;
    },
    storeSortingResult: (state, action) => {
      state.sortedResult = action.payload.sortedResult;
      state.sortedAnimation = action.payload.sortedAnimation;
    },
  },
});
export default sortingBoxSlice;
export const sortingBoxAction = sortingBoxSlice.actions;
