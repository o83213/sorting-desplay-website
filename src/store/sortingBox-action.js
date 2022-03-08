import { animationAction } from '../store/animation-slice';
import { sortingBoxAction } from './sortingBox-slice';
import sortByMethod from '../algorithms/sortByMethod';
const DUMMY_ANIMATION = [
  { index: [0], value: [{ height: 300, color: 'red' }] },
  { index: [1], value: [{ height: 300, color: 'red' }] },
  { index: [2], value: [{ height: 300, color: 'red' }] },
  { index: [3], value: [{ height: 300, color: 'red' }] },
];
const translateAnimation = inputAnimation => {
  let translatedAnimation = [];
  console.log(inputAnimation);
  inputAnimation.forEach(item => {
    // console.log(item);
    const [tag, ...data] = item;
    let isFinal = false;
    if (tag === 'region') {
      // create 2 frame
      //paint left region yellow
      let index = [];
      let value = [];
      for (let i = data[0]; i <= data[1]; i++) {
        index.push(i);
        value.push({ height: null, color: 'yellow' });
        // arrayBars[i].style.backgroundColor = 'yellow';
      }
      // translatedAnimation.push({ index, value });
      // //paint right region orange
      // index = [];
      // value = [];
      for (let i = data[1] + 1; i <= data[2]; i++) {
        index.push(i);
        value.push({ height: null, color: 'orange' });
      }
      translatedAnimation.push({ index, value });
    }
    if (tag === 'compare') {
      // create 1 frame
      //paint two bar to red
      let index = [data[0], data[1]];
      let value = [
        { height: null, color: 'red' },
        { height: null, color: 'red' },
      ];
      translatedAnimation.push({ index, value });
    }
    if (tag === 'chosen') {
      // create 2 frame
      //paint left region yellow
      let index = [];
      let value = [];
      let chosenColor = data[0] === 'anchor' ? 'yellow' : 'green';
      index.push(data[1]);
      value.push({ height: null, color: chosenColor });
      translatedAnimation.push({ index, value });
    }
    if (tag === 'replace') {
      // create 1 frame for each for loop
      isFinal = data[0];
      console.log(isFinal);
      for (let [i, j] = [data[1], 3]; j < data.length; [i++, j++]) {
        let color = isFinal ? '#00BBFF' : 'blue';
        translatedAnimation.push({
          index: [i],
          value: [{ height: data[j], color }],
        });
      }
    }
  });
  return translatedAnimation;
};
export const sortingArray = (array, method) => {
  return dispatch => {
    // console.log(method);
    const [result, animation] = sortByMethod(array, method);
    // console.log([result, animation]);
    let translatedAnimation = translateAnimation(animation);
    // console.log(translatedAnimation);
    dispatch(animationAction.storeAnimation(translatedAnimation));
    dispatch(
      sortingBoxAction.storeSortingResult({
        sortedResult: result,
        sortedAnimation: translatedAnimation,
      })
    );
  };
};
