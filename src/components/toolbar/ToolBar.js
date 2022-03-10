import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { arrayAction } from '../../store/array-slice';
import { sortingBoxAction } from '../../store/sortingBox-slice';
import { animationAction } from '../../store/animation-slice';
import { displayAnimation } from '../../store/animation-action';
import { sortingArray } from '../../store/sortingBox-action';
//////////////////////////////
import classes from './ToolBar.module.css';
import MethodButton from './MethodButton';
import InputBar from './InputBar';
import SortingButton from './SortingButton';
///////////////////////////////////
function ToolBar() {
  // use useState function to get state in function component
  const [size, setSize] = useState(4);
  const [speed, setSpeed] = useState(10);
  const [sortedData, setSortedData] = useState({});
  const [isRunning, setisRunning] = useState(false);
  const [isReadyToSort, setIsReadyToSort] = useState(false);
  // use useRef method to take out the value from the to inputBar
  const sizeRef = useRef();
  const speedRef = useRef();
  // use dispacth method to call function from slice(store in the index)
  const dispatch = useDispatch();
  // use useSelector to call the state from the slice
  const { sortedResult, sortedAnimation } = useSelector(
    state => state.sortingBox
  );
  const array = useSelector(state => state.array.value);
  const isAnimationRunning = useSelector(state => state.animation.isRunning);
  // To change the isRunning state
  useEffect(() => {
    setisRunning(isAnimationRunning);
  }, [isAnimationRunning]);
  // To reset array immediately when the size is changed!
  useEffect(() => {
    dispatch(arrayAction.resetArray(size));
  }, [dispatch, size]);
  // To store the result when the sortedResult, animation were changed
  useEffect(() => {
    setSortedData({ sortedResult, sortedAnimation });
  }, [sortedResult, sortedAnimation]);
  // To reset array when user manually click the reset button
  const resetArrayHandler = () => {
    dispatch(arrayAction.resetArray(size));
  };
  // To renew the size state of the component
  const changeSizeHandler = () => {
    const realSize = Number(sizeRef.current.value) + 4;
    setSize(realSize);
  };
  //To renew the speed state of the component
  const changeSpeedHandler = () => {
    const realSpeed = Number(speedRef.current.value) * 10 + 10;
    setSpeed(realSpeed);
    dispatch(animationAction.changeSpeed(realSpeed));
  };
  // to change the method
  const changeSortingMethodHandler = newMethod => {
    setIsReadyToSort(true);
    dispatch(sortingBoxAction.changeMethod(newMethod));
    dispatch(sortingArray(array, newMethod));
  };
  // to display the sorting result
  const sortingArrayHandler = () => {
    setIsReadyToSort(false);
    dispatch(displayAnimation(sortedData.sortedAnimation, speed));
  };
  return (
    <div className={classes['toolbar']}>
      <div className={classes['container']}>
        <div className={classes['reset']}>
          <button
            className={`${classes['btn']} ${isRunning && classes.disable}`}
            onClick={resetArrayHandler}
            disabled={isRunning}
          >
            Reset Array!
          </button>
        </div>
        <div className={classes['adjust']}>
          <InputBar
            name="Size"
            unit="bars"
            setRef={sizeRef}
            initialValue={4}
            changeStep={1}
            InputFnc={changeSizeHandler}
          />
          <InputBar
            name="Speed"
            unit="ms"
            setRef={speedRef}
            initialValue={10}
            changeStep={10}
            InputFnc={changeSpeedHandler}
          />
        </div>
        <div className={classes['method']}>
          <MethodButton
            method="merge"
            buttonFnc={changeSortingMethodHandler}
            isRunning={isRunning}
          />
          <MethodButton
            method="quick"
            buttonFnc={changeSortingMethodHandler}
            isRunning={isRunning}
          />
          <MethodButton
            method="heap"
            buttonFnc={changeSortingMethodHandler}
            isRunning={isRunning}
          />
          <MethodButton
            method="bubble"
            buttonFnc={changeSortingMethodHandler}
            isRunning={isRunning}
          />
        </div>

        <div className={classes['sort']}>
          {isReadyToSort && (
            <SortingButton buttonFnc={sortingArrayHandler} message={'sort!'} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ToolBar;
