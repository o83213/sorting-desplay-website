import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetArray } from '../features/array';
import { sorting, changeMethod, resetBox } from '../features/sortingBox';
import {
  changeSpeed,
  playAnimation,
  setInitialArray,
} from '../features/animation';
import './ToolBar.css';
function ToolBar() {
  const dispatch = useDispatch();
  const [minsize, minspeed] = [4, 10];
  const [size, setSize] = useState(() => minsize);
  const [speed, setSpeed] = useState(() => minspeed);
  const [isRunning, setisRunning] = useState(() => false);
  /*
  timer testing!
  */
  //
  const sortedData = useSelector(state => {
    return state.sortingBox.value;
  });
  const array = useSelector(state => {
    return state.array.value;
  });
  const sortingBtn = document.getElementById('sortBtn');
  const methodBtn = document.getElementsByClassName('methodBtn');
  const resetBtnColor = () => {
    for (const btn of methodBtn) {
      btn.style.background = 'none';
    }
  };
  /* 
  To deal with useState delay problem, we need to use useEffect function out of the render
  and here is to reset array when draging size bar!
  */
  useEffect(() => {
    // console.log(`size is ${size}`)
    dispatch(resetArray(size));
    dispatch(setInitialArray(array));
  }, [size]);
  useEffect(() => {
    // console.log(`speed is ${speed}`)
    dispatch(changeSpeed(speed));
  }, [speed]);

  useEffect(() => {
    if (isRunning === true) {
      dispatch(setInitialArray(array));
      dispatch(playAnimation(sortedData.sortedAnimation));
      setisRunning(false);
    }
  }, [isRunning]);

  return (
    <div className="toolbar">
      <div className="container">
        <div className="box reset">
          <button
            className="btn"
            onClick={() => {
              dispatch(setInitialArray(array));
              dispatch(resetArray(size));
              resetBtnColor();
              dispatch(resetBox());
              sortingBtn.style.display = 'none';
              // testing timer!
              //
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
              onChange={event => {
                setSize(Number(event.target.value) + 4);
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
              console.log('Merge sort!');
              dispatch(changeMethod('merge'));
              sortingBtn.style.display = 'block';
              resetBtnColor();
              event.target.style.background = 'yellow';
            }}
          >
            Merge Sort
          </button>
          <button
            className="btn methodBtn"
            onClick={event => {
              console.log('Quick sort!');
              dispatch(changeMethod('quick'));
              sortingBtn.style.display = 'block';
              resetBtnColor();
              event.target.style.background = 'yellow';
            }}
          >
            Quick Sort
          </button>
          <button
            className="btn methodBtn"
            onClick={event => {
              console.log('Heap sort!');
              dispatch(changeMethod('heap'));
              sortingBtn.style.display = 'block';
              resetBtnColor();
              event.target.style.background = 'yellow';
            }}
          >
            Heap Sort
          </button>
          <button
            className="btn methodBtn"
            onClick={event => {
              console.log('Bubble sort!');
              dispatch(changeMethod('bubble'));
              sortingBtn.style.display = 'block';
              resetBtnColor();
              event.target.style.background = 'yellow';
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
