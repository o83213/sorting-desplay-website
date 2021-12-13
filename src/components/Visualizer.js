import React from 'react';
import { useSelector } from 'react-redux';
import './Visualizer.css';
function Visualizer() {
  const array = useSelector(state => {
    return state.array.value;
  });

  return (
    <div>
      <div id="bodyContainer">
        {array.map((value, index) => {
          return (
            <div
              className="bar"
              key={index}
              style={{
                height: `${value}px`,
                backgroundColor: 'blue',
              }}
            ></div>
          );
        })}
      </div>
      <div>
        <h3 id="timer">Not counting yet!</h3>
      </div>
    </div>
  );
}

export default Visualizer;

// {array.map((value, index) => {
// return (
//     <div className="bar" id={index} style={{ width: `${value}px` }}></div>
// )
// })}
