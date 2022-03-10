import { createSlice } from '@reduxjs/toolkit';
const initialState = { animationData: [], speed: 10, isRunning: false };
const animationSlice = createSlice({
  name: 'animation',
  initialState,
  reducers: {
    changeSpeed: (state, action) => {
      state.speed = action.payload;
    },
    storeAnimation: (state, action) => {
      state.animationData = action.payload;
    },
    changingRunningState(state, action) {
      state.isRunning = action.payload;
    },
  },
});
export const animationAction = animationSlice.actions;
export default animationSlice;
