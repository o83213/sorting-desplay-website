import classes from './SortingButton.module.css';
const SortingButton = props => {
  return (
    <button className={classes.btn} onClick={props.buttonFnc}>
      Sort!
    </button>
  );
};

export default SortingButton;
