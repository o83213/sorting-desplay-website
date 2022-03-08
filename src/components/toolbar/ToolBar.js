import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { arrayAction } from '../../store/array-slice';
import { sortingBoxAction } from '../../store/sortingBox-slice';
import { animationAction } from '../../store/animation-slice';
// import { resetArray, setInitialArray } from '../features/array';
// import { sorting, changeMethod, resetBox } from '../features/sortingBox';
// import { changeSpeed, playAnimation } from '../features/animation';
import './ToolBar.css';
import MethodButton from './MethodButton';
import InputBar from './InputBar';
function ToolBar() {
  // use useState function to get state in function component
  const [size, setSize] = useState(4);
  const [speed, setSpeed] = useState(10);
  const [isRunning, setisRunning] = useState(false);
  //
  const sizeRef = useRef();
  const speedRef = useRef();
  // use dispacth method to call function from slice(store in the index)
  const dispatch = useDispatch();

  // use useSelector to call the state from the slice
  const sortedData = useSelector(state => state.sortingBox.value);
  const array = useSelector(state => state.array.value);

  // To highlight the chosen btn color and reset other buttons to no color
  const sortingBtn = document.getElementById('sortBtn');
  const methodBtn = document.getElementsByClassName('methodBtn');
  const resetClickBtn = document.getElementById('resetBtn');

  function resetBtn(event) {
    for (const btn of methodBtn) {
      btn.style.background = 'none';
    }
    resetClickBtn.style.background = 'none';
    sortingBtn.style.display = 'block';
    event.target.style.background = 'yellow';
  }
  /* 
  To deal with useState delay problem, we need to use useEffect function out of the render
  and here is to reset array when draging size bar!
  */
  useEffect(() => {
    dispatch(arrayAction.resetArray(size));
  }, [size]);

  useEffect(() => {
    if (isRunning === true) {
      dispatch(arrayAction.setInitialArray());
      dispatch(animationAction.playAnimation(sortedData.sortedAnimation));
      setisRunning(false);
    }
  }, [isRunning]);
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
  return (
    <div className="toolbar">
      <div className="container">
        <div className="box reset">
          <button className="btn" onClick={resetArrayHandler}>
            Reset Array!
          </button>
        </div>
        <div className="box adjust">
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
        <div className="box method">
          <MethodButton
            method="merge"
            buttonFnc={() => {
              console.log('merge');
            }}
          />
          <MethodButton
            method="quick"
            buttonFnc={() => {
              console.log('quick');
            }}
          />
          <MethodButton
            method="heap"
            buttonFnc={() => {
              console.log('heap');
            }}
          />
          <MethodButton
            method="bubble"
            buttonFnc={() => {
              console.log('bubble');
            }}
          />
          <MethodButton
            method="test"
            buttonFnc={() => {
              dispatch(
                arrayAction.changeArrayByIndex({
                  index: [1],
                  value: [{ value: 300 }],
                })
              );
            }}
          />
        </div>

        <div className="box sort">
          <button
            className="btn"
            id="sortBtn"
            onClick={() => {
              dispatch(sortingBoxAction.sorting(array));
              setisRunning(true);
            }}
          >
            Sort!
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToolBar;
