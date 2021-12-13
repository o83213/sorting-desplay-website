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

import { createSlice } from '@reduxjs/toolkit'
import mergeSort from '../Algorithms/mergeSort'
import quickSort from '../Algorithms/quickSort'
import heapSort from '../Algorithms/heapSort'
import bubbleSort from '../Algorithms/bubbleSort'

const initialStateValue = { sortedResult: [], sortedAnimation: [], method: '' }
export const sortingBoxSlice = createSlice({
  name: 'sortingBox',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    sorting: (state, action) => {
      const data = action.payload.slice()
      let [result, animation] = [[], []]
      switch (state.value.method) {
        case 'merge':
          console.log(`Now going to use ${state.value.method} sort!`)
          ;[result, animation] = mergeSort(data)
          console.log(result)
          console.log(animation)
          break
        case 'quick':
          console.log(`Now going to use ${state.value.method} sort!`)
          ;[result, animation] = quickSort(data)
          console.log(result)
          console.log(animation)
          break
        case 'bubble':
          console.log(`Now going to use ${state.value.method} sort!`)
          ;[result, animation] = bubbleSort(data)
          console.log(result)
          console.log(animation)
          break
        case 'heap':
          console.log(`Now going to use ${state.value.method} sort!`)
          ;[result, animation] = heapSort(data)
          console.log(result)
          console.log(animation)
          break
        default:
          console.log('No method now!')
      }
      state.value = {
        sortedResult: result,
        sortedAnimation: animation,
        method: state.value.method,
      }
    },
    changeMethod: (state, action) => {
      state.value.method = action.payload
    },
    resetBox: (state) => {
      console.log('Reset box!')
      state.value = initialStateValue
    },
  },
})
export default sortingBoxSlice.reducer
export const { sorting, changeMethod, resetBox } = sortingBoxSlice.actions
