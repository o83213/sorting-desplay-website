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
const initialState = { value: [] };
// const arrayBars = document.getElementsByClassName('bar');
// function recoverArray(initialArray) {
//   for (let i = 0; i < initialArray.length; i++) {
//     arrayBars[i].style.height = `${initialArray[i]}px`;
//     arrayBars[i].style.backgroundColor = 'blue';
//   }
// }

const arraySlice = createSlice({
  name: 'array',
  initialState,
  reducers: {
    resetArray: (state, action) => {
      // state.value = createRandomArray(action.payload);
      let data = [];
      createRandomArray(action.payload).forEach(el => {
        data.push({ height: el, color: 'blue' });
      });
      console.log(data);
      state.value = data;
    },
    changeArrayByIndex: (state, action) => {
      let newArray = state.value;
      for (let i = 0; i < action.payload.index.length; i++) {
        // console.log(newArray[action.payload.index[i]].height);
        // console.log(newArray[action.payload.index[i]].color);
        // ////////////////////////////////
        // console.log(action.payload.index[i]);
        console.log(action.payload.value[i]);
        if (action.payload.value[i].height) {
          newArray[action.payload.index[i]].height =
            action.payload.value[i].height;
        }
        if (action.payload.value[i].color) {
          newArray[action.payload.index[i]].color =
            action.payload.value[i].color;
        }
        // newArray[action.payload.index[i]] = action.payload.value[i];
      }
      state.value = newArray;
    },
  },
});
export const arrayAction = arraySlice.actions;
export default arraySlice;
