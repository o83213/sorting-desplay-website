import classes from './InputBar.module.css';
import { useState } from 'react';
const InputBar = props => {
  const [value, setValue] = useState(0);
  const changeValueHandler = event => {
    setValue(Number(event.target.value));
    props.InputFnc();
  };
  return (
    <div className={classes.adjust}>
      <label htmlFor="input">{props.name}:</label>
      <input
        type="range"
        className="input"
        defaultValue="0"
        max={96}
        step={1}
        ref={props.setRef}
        onChange={changeValueHandler}
      ></input>
      <label htmlFor="input">
        {props.changeStep * value + props.initialValue} {props.unit}
      </label>
    </div>
  );
};
export default InputBar;
