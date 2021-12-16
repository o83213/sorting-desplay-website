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
      console.log(`Now going to use ${method} sort!`);
      [result, animation] = mergeSort(data);
      console.log(result);
      console.log(animation);
      break;
    case 'quick':
      console.log(`Now going to use ${method} sort!`);
      [result, animation] = quickSort(data);
      console.log(result);
      console.log(animation);
      break;
    case 'bubble':
      console.log(`Now going to use ${method} sort!`);
      [result, animation] = bubbleSort(data);
      console.log(result);
      console.log(animation);
      break;
    case 'heap':
      console.log(`Now going to use ${method} sort!`);
      [result, animation] = heapSort(data);
      console.log(result);
      console.log(animation);
      break;
    default:
      console.log('No method now!');
  }
  return [result, animation];
}

export default sortByMethod;
