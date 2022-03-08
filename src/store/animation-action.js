import { arrayAction } from './array-slice';
export const displayAnimation = (animation, speed) => {
  console.log(animation);
  console.log(speed);
  return async dispatch => {
    let timmer = 0;
    const DUMMY_ANIMATION = [
      { index: [0], value: [{ height: 300, color: 'red' }] },
      { index: [1], value: [{ height: 300, color: 'red' }] },
      { index: [2], value: [{ height: 300, color: 'red' }] },
      { index: [3], value: [{ height: 300, color: 'red' }] },
    ];
    console.log(DUMMY_ANIMATION);
    console.log(animation);
    animation.forEach(item => {
      timmer += speed;
      //   console.log(item);
      setTimeout(() => {
        dispatch(arrayAction.changeArrayByIndex(item));
      }, timmer);
    });
  };
};
