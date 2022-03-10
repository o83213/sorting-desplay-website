import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classes from './Visualizer.module.css';
function Visualizer() {
  const [array, setArray] = useState([]);
  const [timer, setTimmer] = useState(0);
  const arrayData = useSelector(state => state.array.value);
  const isRunning = useSelector(state => state.animation.isRunning);
  useEffect(() => {
    setArray(arrayData);
  }, [arrayData]);
  useEffect(() => {
    const startingTime = new Date();
    let countingTime;
    if (isRunning) {
      countingTime = setInterval(() => {
        const now = new Date();
        setTimmer(now - startingTime);
      }, 100);
    }
    return () => {
      clearInterval(countingTime);
    };
  }, [isRunning]);
  return (
    <div>
      <div className={classes['bodyContainer']}>
        {array.map((data, index) => {
          return (
            <div
              className={classes['bar']}
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
        <h3>{(timer / 1000).toFixed(1)} seconds</h3>
      </div>
    </div>
  );
}

export default Visualizer;
