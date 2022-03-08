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
import createRandomArray from '../algorithms/createRandomArray';
const initialStateValue = [];
// const arrayBars = document.getElementsByClassName('bar');
// function recoverArray(initialArray) {
//   for (let i = 0; i < initialArray.length; i++) {
//     arrayBars[i].style.height = `${initialArray[i]}px`;
//     arrayBars[i].style.backgroundColor = 'blue';
//   }
// }

const arraySlice = createSlice({
  name: 'array',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    resetArray: (state, action) => {
      // state.value = createRandomArray(action.payload);
      let data = [];
      createRandomArray(action.payload).forEach(el => {
        data.push({ value: el, color: 'blue' });
      });
      console.log(data);
      state.value = data;
    },
    changeArrayByIndex: (state, action) => {
      // accept payload as an obj {index: [], value: []}
      state.value.forEach(item => console.log(item));
      let newArray = state.value;
      for (let i = 0; i < action.payload.index.length; i++) {
        newArray[action.payload.index[i]] = action.payload.value[i];
      }
      state.value = newArray;
      state.value.forEach(item => console.log(item));
    },
  },
});
export const arrayAction = arraySlice.actions;
export default arraySlice;
