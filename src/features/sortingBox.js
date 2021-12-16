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
import sortByMethod from '../Algorithms/sortByMethod';

const initialStateValue = { sortedResult: [], sortedAnimation: [], method: '' };
export const sortingBoxSlice = createSlice({
  name: 'sortingBox',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    sorting: (state, action) => {
      let [result, animation] = sortByMethod(
        state.value.method,
        action.payload
      );
      state.value = {
        sortedResult: result,
        sortedAnimation: animation,
        method: state.value.method,
      };
    },
    changeMethod: (state, action) => {
      state.value.method = action.payload;
    },
    resetBox: state => {
      state.value = initialStateValue;
    },
  },
});
export default sortingBoxSlice.reducer;
export const { sorting, changeMethod, resetBox } = sortingBoxSlice.actions;
