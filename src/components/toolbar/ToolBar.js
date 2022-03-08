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
  const [method, setMethod] = useState('');
  const [isRunning, setisRunning] = useState(false);
  const [hasMethod, setHasMethod] = useState(false);
  //
  const sizeRef = useRef();
  const speedRef = useRef();
  // use dispacth method to call function from slice(store in the index)
  const dispatch = useDispatch();

  // use useSelector to call the state from the slice
  const { method: sortingMethod, sortedResult, sortedAnimation } = useSelector(
    state => state.sortingBox
  );
  const array = useSelector(state => state.array.value);

  // To highlight the chosen btn color and reset other buttons to no color
  // const sortingBtn = document.getElementById('sortBtn');
  // const methodBtn = document.getElementsByClassName('methodBtn');
  // const resetClickBtn = document.getElementById('resetBtn');

  // function resetBtn(event) {
  //   for (const btn of methodBtn) {
  //     btn.style.background = 'none';
  //   }
  //   resetClickBtn.style.background = 'none';
  //   sortingBtn.style.display = 'block';
  //   event.target.style.background = 'yellow';
  // }
  /* 
  To deal with useState delay problem, we need to use useEffect function out of the render
  and here is to reset array when draging size bar!
  */
  useEffect(() => {
    dispatch(arrayAction.resetArray(size));
  }, [dispatch, size]);

  useEffect(() => {
    if (isRunning === true) {
      // dispatch(animationAction.playAnimation(sortedData.sortedAnimation));
      setisRunning(false);
    }
  }, [dispatch, isRunning]);
  useEffect(() => {
    console.log(sortingMethod);
    setMethod(sortingMethod);
  }, [sortingMethod]);
  useEffect(() => {
    console.log('sortedResult change!');
    setSortedData({ sortedResult, sortedAnimation });
  }, [sortedResult, sortedAnimation]);
  const resetArrayHandler = () => {
    console.log(size);
    dispatch(arrayAction.resetArray(size));
  };
  const changeSizeHandler = () => {
    const realSize = Number(sizeRef.current.value) + 4;
    console.log(realSize);
    setSize(realSize);
    // resetArrayHandler();
  };
  const changeSpeedHandler = () => {
    const realSpeed = Number(speedRef.current.value) * 10 + 10;
    console.log(realSpeed);
    setSpeed(realSpeed);
    dispatch(animationAction.changeSpeed(realSpeed));
  };
  const changeSortingMethodHandler = newMethod => {
    setHasMethod(true);
    dispatch(sortingBoxAction.changeMethod(newMethod));
    dispatch(sortingArray(array, newMethod));
    // setisRunning(true);
  };
  const sortingArrayHandler = () => {
    console.log('sort!');
    // dispatch(sortingArray(array, method));
    setisRunning(true);
    console.log(sortedData.sortedAnimation);
    dispatch(displayAnimation(sortedData.sortedAnimation, speed));
  };
  return (
    <div className={classes['toolbar']}>
      <div className={classes['container']}>
        <div className={classes['reset']}>
          <button className={classes['btn']} onClick={resetArrayHandler}>
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
          <MethodButton method="merge" buttonFnc={changeSortingMethodHandler} />
          <MethodButton method="quick" buttonFnc={changeSortingMethodHandler} />
          <MethodButton method="heap" buttonFnc={changeSortingMethodHandler} />
          <MethodButton
            method="bubble"
            buttonFnc={changeSortingMethodHandler}
          />
        </div>

        <div className={classes['sort']}>
          {hasMethod && <SortingButton buttonFnc={sortingArrayHandler} />}
        </div>
      </div>
    </div>
  );
}

export default ToolBar;
