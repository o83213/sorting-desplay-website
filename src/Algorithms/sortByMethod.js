import mergeSort from '../Algorithms/mergeSort';
import quickSort from '../Algorithms/quickSort';
import heapSort from '../Algorithms/heapSort';
import bubbleSort from '../Algorithms/bubbleSort';

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
