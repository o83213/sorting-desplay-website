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

  inputAnimation.forEach(item => {
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
      isFinal = data.shift();

      for (let [i, j] = [data[0], 2]; j < data.length; [i++, j++]) {
        let color = isFinal ? '#00BBFF' : 'blue';
        translatedAnimation.push({
          index: [i],
          value: [{ height: data[j], color }],
        });
      }
    }
    if (tag === 'switch') {
      /* the switch case is use in qicuksort, bubble sort, and heap sort. There is an isFinal mark to check and will paint the data which was not need to change again to light blue. If the data is still needed to be sort, it will be paint in blue.
       */
      isFinal = data.shift();
      let color = isFinal ? '#00BBFF' : 'blue';
      // first mark two switch pair in green
      translatedAnimation.push({
        index: [data[0], data[1]],
        value: [
          { height: null, color: 'green' },
          { height: null, color: 'green' },
        ],
      });
      // switch their height
      translatedAnimation.push({
        index: [data[0], data[1]],
        value: [
          { height: data[2], color: 'green' },
          { height: data[3], color: 'green' },
        ],
      });
      // after switching, set their color back to blue or final color.
      translatedAnimation.push({
        index: [data[0], data[1]],
        value: [
          { height: null, color: 'blue' },
          { height: null, color: color },
        ],
      });
    }
    if (tag === 'recoverColor') {
      let recoverIndex = data.length <= 1 ? [data] : [...data];
      let index = [];
      let value = [];
      for (let i = 0; i < recoverIndex.length; i++) {
        index.push(recoverIndex[i]);
        value.push({ height: null, color: 'blue' });
        // arrayBars[recoverIndex[i]].style.backgroundColor = 'blue';
      }
      translatedAnimation.push({ index, value });
    }
    if (tag === 'finish') {
      let finishIndex = data.length <= 1 ? [data] : [...data];
      let index = [];
      let value = [];
      for (let i = 0; i < finishIndex.length; i++) {
        index.push(finishIndex[i]);
        value.push({ height: null, color: '#00BBFF' });
        // arrayBars[finishIndex[i]].style.backgroundColor = '#00BBFF';
      }
      translatedAnimation.push({ index, value });
    }
  });
  return translatedAnimation;
};
export const sortingArray = (array, method) => {
  return dispatch => {
    const [result, animation] = sortByMethod(array, method);

    let translatedAnimation = translateAnimation(animation);

    dispatch(animationAction.storeAnimation(translatedAnimation));
    dispatch(
      sortingBoxAction.storeSortingResult({
        sortedResult: result,
        sortedAnimation: translatedAnimation,
      })
    );
  };
};
