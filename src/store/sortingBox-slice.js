import { createSlice } from '@reduxjs/toolkit';

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
