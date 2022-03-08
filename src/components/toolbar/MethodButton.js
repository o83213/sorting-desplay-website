import classes from './MethodButton.module.css';
const MethodButton = props => {
  return (
    <button
      className={classes.btn}
      onClick={props.buttonFnc}
    >{`${props.method}`}</button>
  );
};
export default MethodButton;
