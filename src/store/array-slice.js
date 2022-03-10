import { createSlice } from '@reduxjs/toolkit';
import createRandomArray from '../algorithms/createRandomArray';
const initialState = { value: [] };

const arraySlice = createSlice({
  name: 'array',
  initialState,
  reducers: {
    resetArray: (state, action) => {
      let data = [];
      createRandomArray(action.payload).forEach(el => {
        data.push({ height: el, color: 'blue' });
      });

      state.value = data;
    },
    changeArrayByIndex: (state, action) => {
      let newArray = state.value;
      for (let i = 0; i < action.payload.index.length; i++) {
        if (action.payload.value[i].height) {
          newArray[action.payload.index[i]].height =
            action.payload.value[i].height;
        }
        if (action.payload.value[i].color) {
          newArray[action.payload.index[i]].color =
            action.payload.value[i].color;
        }
      }
      state.value = newArray;
    },
  },
});
export const arrayAction = arraySlice.actions;
export default arraySlice;
