import { switchData } from './swapFunction';

function partition(data, start, end, animation) {
  let pivot = start;
  let isFinal = false;
  console.log(`start is ${start}, end is ${end}`);
  animation.push(['chosen', 'anchor', pivot]);
  while (end > start) {
    // find start index
    // first input [pivot, start] animation, because they will compare first!
    // animation.push(['chosen', 'start', start]);
    while (end > start && data[start] <= data[pivot]) {
      // animation.push([pivot, start]);
      if (start !== pivot) {
        animation.push(['recoverColor', start]);
      }
      start++;
      animation.push(['compare', start, end]);
    }
    while (data[end] > data[pivot]) {
      animation.push(['recoverColor', end]);
      end--;
      animation.push(['compare', start, end]);
    }

    if (end > start) {
      switchData(data, start, end);
      animation.push(['switch', isFinal, start, end, data[start], data[end]]);
    } else if (pivot !== end) {
      switchData(data, pivot, end);
      isFinal = true;
      animation.push(['recoverColor', start, end]);
      animation.push(['switch', isFinal, pivot, end, data[pivot], data[end]]);
    }
  }
  if (end === pivot) {
    animation.push(['recoverColor', start, end]);
    animation.push(['finish', end]);
  }
  return end;
}

function doQuickSort(data, start = 0, end = data.length - 1, animation) {
  if (start < end) {
    const anchor = partition(data, start, end, animation);
    doQuickSort(data, start, anchor - 1, animation);
    doQuickSort(data, anchor + 1, end, animation);
  } else if (start === end) {
    animation.push(['finish', start]);
  }
}

function quickSort(data) {
  let result = data;
  const animation = [];
  doQuickSort(result, 0, result.length - 1, animation);
  return [result, animation];
}

export default quickSort;
