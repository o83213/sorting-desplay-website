import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Visualizer.css';
function Visualizer() {
  const [array, setArray] = useState([]);
  const [timmer, setTimmer] = useState(0);
  const arrayData = useSelector(state => state.array.value);
  const isRunning = useSelector(state => state.animation.isRunning);
  useEffect(() => {
    setArray(arrayData);
  }, [arrayData]);
  useEffect(() => {
    const startingTime = new Date();
    console.log(isRunning);
    let countingTime;
    if (isRunning) {
      console.log('Renew Timmer!');
      console.log(startingTime);
      countingTime = setInterval(() => {
        const now = new Date();
        console.log(now - startingTime);
        setTimmer(now - startingTime);
      }, 100);
    }
    return () => {
      clearInterval(countingTime);
    };
  }, [isRunning]);
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
        <h3 id="timer">{(timmer / 1000).toFixed(1)} seconds</h3>
      </div>
    </div>
  );
}

export default Visualizer;
