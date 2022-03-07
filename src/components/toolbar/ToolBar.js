import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { arrayAction } from '../../store/array-slice';
import { sortingBoxAction } from '../../store/sortingBox-slice';
import { animationAction } from '../../store/animation-slice';
// import { resetArray, setInitialArray } from '../features/array';
// import { sorting, changeMethod, resetBox } from '../features/sortingBox';
// import { changeSpeed, playAnimation } from '../features/animation';
import './ToolBar.css';

function ToolBar() {
  // use useState function to get state in function component
  const [size, setSize] = useState(4);
  const [speed, setSpeed] = useState(10);
  const [isRunning, setisRunning] = useState(false);
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
    dispatch(animationAction.changeSpeed(speed));
  }, [speed]);

  useEffect(() => {
    if (isRunning === true) {
      dispatch(arrayAction.setInitialArray());
      dispatch(animationAction.playAnimation(sortedData.sortedAnimation));
      setisRunning(false);
    }
  }, [isRunning]);

  return (
    <div className="toolbar">
      <div className="container">
        <div className="box reset">
          <button
            className="btn"
            id="resetBtn"
            onClick={event => {
              dispatch(arrayAction.setInitialArray());
              dispatch(arrayAction.resetArray(size));
              dispatch(sortingBoxAction.resetBox());
              resetBtn(event);
            }}
          >
            Reset Array!
          </button>
        </div>
        <div className="box adjust">
          <div className="adjust-label">
            <label htmlFor="size">Size:</label>
            <input
              type="range"
              className="size-input"
              defaultValue="0"
              max={96}
              onChange={event => {
                setSize(Number(event.target.value) + 4);
                dispatch(arrayAction.setInitialArray());
              }}
            ></input>
            <label htmlFor="size" id="sizeValue">
              {size} bars
            </label>
          </div>
          <div className="adjust-label">
            <label htmlFor="speed">Speed:</label>
            <input
              type="range"
              className="speed-input"
              defaultValue="0"
              max={99}
              onChange={event => {
                setSpeed(Number(event.target.value) * 10 + 10);
              }}
            ></input>
            <label htmlFor="speed" id="speedValue">
              {speed} ms
            </label>
          </div>
        </div>
        <div className="box method">
          <button
            className="btn methodBtn"
            onClick={event => {
              dispatch(sortingBoxAction.changeMethod('merge'));
              resetBtn(event);
            }}
          >
            Merge Sort
          </button>
          <button
            className="btn methodBtn"
            onClick={event => {
              dispatch(changeMethod('quick'));
              resetBtn(event);
            }}
          >
            Quick Sort
          </button>
          <button
            className="btn methodBtn"
            onClick={event => {
              dispatch(changeMethod('heap'));
              resetBtn(event);
            }}
          >
            Heap Sort
          </button>
          <button
            className="btn methodBtn"
            onClick={event => {
              dispatch(changeMethod('bubble'));
              resetBtn(event);
            }}
          >
            Bubble Sort
          </button>
        </div>

        <div className="box sort">
          <button
            className="btn"
            id="sortBtn"
            onClick={() => {
              dispatch(sorting(array));
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
