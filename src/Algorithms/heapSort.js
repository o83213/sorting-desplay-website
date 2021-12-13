import { switchData } from './swapFunction';
let isFinal = false;
function heapify(data, lastParent, animation) {
  for (let i = lastParent; i >= 0; i--) {
    let childIndexLeft = i * 2 + 1;
    let childIndexRight = i * 2 + 2;
    let anchor = i;
    while (childIndexLeft < data.length) {
      // while there is a left child exist, need to doing comparing, so
      // here is to create comparing animation
      if (childIndexRight < data.length) {
        animation.push(['compare', childIndexLeft, childIndexRight]);
        animation.push(['recoverColor', childIndexLeft, childIndexRight]);
        data[childIndexLeft] < data[childIndexRight]
          ? animation.push(['compare', anchor, childIndexRight])
          : animation.push(['compare', anchor, childIndexLeft]);
      } else {
        animation.push(['compare', anchor, childIndexLeft]);
      }

      // here is to do switch check
      if (
        childIndexRight < data.length &&
        data[anchor] < data[childIndexRight] &&
        data[childIndexLeft] < data[childIndexRight]
      ) {
        console.log(`childIndexRight is : ${childIndexRight}`);
        console.log(`childIndexRight value is : ${data[childIndexRight]}`);
        console.log(`switch with childRight`);
        switchData(data, anchor, childIndexRight);
        // record animation
        animation.push([
          'switch',
          isFinal,
          anchor,
          childIndexRight,
          data[anchor],
          data[childIndexRight],
        ]);
        anchor = childIndexRight;
      } else if (data[anchor] < data[childIndexLeft]) {
        console.log(`switch with childleft`);
        switchData(data, anchor, childIndexLeft);
        animation.push([
          'switch',
          isFinal,
          anchor,
          childIndexLeft,
          data[anchor],
          data[childIndexLeft],
        ]);
        anchor = childIndexLeft;
      } else {
        childIndexRight < data.length - i &&
        data[childIndexLeft] < data[childIndexRight]
          ? animation.push(['recoverColor', anchor, childIndexRight])
          : animation.push(['recoverColor', anchor, childIndexLeft]);
        break;
      }

      childIndexLeft = anchor * 2 + 1;
      childIndexRight = anchor * 2 + 2;
    }
    console.log(`In heapify, data is : ${data}`);
  }
}

function takeAway(data, animation) {
  for (let i = 1; i < data.length; i++) {
    // take away yop element and put it at the end
    let anchor = 0;
    switchData(data, 0, data.length - i);
    isFinal = true;
    animation.push([
      'switch',
      isFinal,
      0,
      data.length - i,
      data[0],
      data[data.length - i],
    ]);
    isFinal = false;
    // rebuild the heap
    let childIndexLeft = anchor * 2 + 1;
    let childIndexRight = anchor * 2 + 2;
    while (childIndexLeft < data.length - i) {
      // while there is a left child exist, need to doing comparing, so
      // here is to create comparing animation
      if (childIndexRight < data.length - i) {
        animation.push(['compare', childIndexLeft, childIndexRight]);
        animation.push(['recoverColor', childIndexLeft, childIndexRight]);
        data[childIndexLeft] < data[childIndexRight]
          ? animation.push(['compare', anchor, childIndexRight])
          : animation.push(['compare', anchor, childIndexLeft]);
      } else {
        animation.push(['compare', anchor, childIndexLeft]);
      }
      if (
        childIndexRight < data.length - i &&
        data[anchor] < data[childIndexRight] &&
        data[childIndexLeft] < data[childIndexRight]
      ) {
        switchData(data, anchor, childIndexRight);
        animation.push([
          'switch',
          isFinal,
          anchor,
          childIndexRight,
          data[anchor],
          data[childIndexRight],
        ]);
        anchor = childIndexRight;
      } else if (data[anchor] < data[childIndexLeft]) {
        switchData(data, anchor, childIndexLeft);
        animation.push([
          'switch',
          isFinal,
          anchor,
          childIndexLeft,
          data[anchor],
          data[childIndexLeft],
        ]);
        anchor = childIndexLeft;
      } else {
        childIndexRight < data.length - i &&
        data[childIndexLeft] < data[childIndexRight]
          ? animation.push(['recoverColor', anchor, childIndexRight])
          : animation.push(['recoverColor', anchor, childIndexLeft]);
        break;
      }
      childIndexLeft = anchor * 2 + 1;
      childIndexRight = anchor * 2 + 2;
      console.log(`In takeaway, data is : ${data}`);
    }
  }
  animation.push(['finish', 0]);
}

function heapSort(input) {
  let data = input;
  const animation = [];
  const length = data.length;
  const lastParentIndex = 2 ** Math.trunc(Math.log2(length)) - 2;
  console.log(`lastParentIndex is ${lastParentIndex}`);
  heapify(data, lastParentIndex, animation);
  console.log(`After heapify, data is ${data}`);
  takeAway(data, animation);
  console.log(`After takeaway, data is ${data}`);
  return [data, animation];
}

export default heapSort;
