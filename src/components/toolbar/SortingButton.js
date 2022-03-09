import classes from './SortingButton.module.css';
const SortingButton = props => {
  return (
    <button className={classes.btn} onClick={props.buttonFnc}>
      {props.message}
    </button>
  );
};

export default SortingButton;
