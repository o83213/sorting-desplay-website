import classes from './MethodButton.module.css';
const MethodButton = props => {
  return <button className={classes.btn}>{`${props.method}`}</button>;
};
export default MethodButton;
