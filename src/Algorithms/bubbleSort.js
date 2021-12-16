import { switchData } from './swapFunction';

function bubbleSort(data) {
  const animation = [];
  let result = data;
  let isSwitch = false;
  let isFinal = false;
  for (let i = 0; i < result.length - 1; i++) {
    isSwitch = false;
    isFinal = false;
    for (let j = 0; j < result.length - i - 1; j++) {
      animation.push(['compare', j, j + 1]);
      isFinal = j === result.length - i - 2 ? true : false;
      if (result[j] > result[j + 1]) {
        switchData(result, j, j + 1);
        animation.push(['switch', isFinal, j, j + 1, result[j], result[j + 1]]);
        isSwitch = true;
      } else {
        animation.push(['recoverColor', j, j + 1]);
        if (isSwitch && isFinal)
          animation.push(['finish', result.length - 1 - i]);
      }
    }
    if (!isSwitch) {
      const finish = ['finish'];
      for (let k = 0; k < result.length - i; k++) {
        finish.push(k);
      }
      animation.push(finish);
      break;
    } else if (isSwitch && i === result.length - 2) {
      animation.push(['finish', 0]);
    }
  }
  return [result, animation];
}

export default bubbleSort;
