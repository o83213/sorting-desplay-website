import { arrayAction } from './array-slice';
import { animationAction } from './animation-slice';
export const displayAnimation = (animation, speed) => {
  return dispatch => {
    let timmer = 0;

    dispatch(animationAction.changingRunningState(true));
    animation.forEach(item => {
      timmer += speed;
      setTimeout(() => {
        dispatch(arrayAction.changeArrayByIndex(item));
      }, timmer);
    });
    setTimeout(() => {
      dispatch(animationAction.changingRunningState(false));
    }, timmer);
  };
};
