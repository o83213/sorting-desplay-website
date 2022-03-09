import classes from './MethodButton.module.css';
const MethodButton = props => {
  return (
    <button
      className={`${classes.btn} ${props.isRunning && classes.disable}`}
      disabled={props.isRunning}
      onClick={() => {
        props.buttonFnc(props.method);
      }}
    >{`${props.method}`}</button>
  );
};
export default MethodButton;
