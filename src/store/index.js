import { configureStore } from '@reduxjs/toolkit';
import animationSlice from './animation-slice';
import arraySlice from './array-slice';
import sortingBoxSlice from './sortingBox-slice';
const store = configureStore({
  reducer: {
    animation: animationSlice.reducer,
    array: arraySlice.reducer,
    sortingBox: sortingBoxSlice.reducer,
  },
});
export default store;
