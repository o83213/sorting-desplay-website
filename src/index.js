import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import arrayReducer from './features/array';
import animationReducer from './features/animation';
import sortingBoxReducer from './features/sortingBox';
//
const store = configureStore({
  reducer: {
    array: arrayReducer,
    animation: animationReducer,
    sortingBox: sortingBoxReducer,
  },
});
//
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
