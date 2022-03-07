import mergeSort from './mergeSort';
import quickSort from './quickSort';
import heapSort from './heapSort';
import bubbleSort from './bubbleSort';

function sortByMethod(method, input) {
  const data = input.slice();
  let result = [];
  let animation = [];
  switch (method) {
    case 'merge':
      [result, animation] = mergeSort(data);
      break;
    case 'quick':
      [result, animation] = quickSort(data);
      break;
    case 'bubble':
      [result, animation] = bubbleSort(data);
      break;
    case 'heap':
      [result, animation] = heapSort(data);
      break;
    default:
  }
  return [result, animation];
}

export default sortByMethod;
