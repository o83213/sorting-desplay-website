import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Visualizer.css';
function Visualizer() {
  const [array, setArray] = useState([]);
  const arrayData = useSelector(state => {
    return state.array.value;
  });
  useEffect(() => {
    setArray(arrayData);
  }, [arrayData]);
  return (
    <div>
      <div id="bodyContainer">
        {array.map((data, index) => {
          return (
            <div
              className="bar"
              key={index}
              style={{
                height: `${data.height}px`,
                backgroundColor: `${data.color ? data.color : 'blue'}`,
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
