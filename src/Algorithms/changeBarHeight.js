const arrayBars = document.getElementsByClassName('bar');
const closeBtn = document.getElementsByTagName('button');
const closeInput = document.getElementsByTagName('input');
function changeBarHeight(inputAnimation, timeDelay = 100) {
  let timer = 0;
  const animation = [...inputAnimation, ['animationEnd']];
  // close btn when animation is running
  for (const element of closeBtn) {
    element.style.pointerEvents = 'none';
  }
  for (const element of closeInput) {
    element.style.pointerEvents = 'none';
  }

  for (let i = 0; i < animation.length; i++) {
    let [action, ...data] = animation[i];
    let isFinal = false;
    let chosenMark = '';
    switch (action) {
      case 'region':
        //paint left region yellow
        setTimeout(() => {
          for (let i = data[0]; i <= data[1]; i++) {
            arrayBars[i].style.backgroundColor = 'yellow';
          }
        }, timer);
        //paint right region orange
        setTimeout(() => {
          for (let i = data[1] + 1; i <= data[2]; i++) {
            arrayBars[i].style.backgroundColor = 'orange';
          }
        }, timer + timeDelay);
        timer += 2 * timeDelay;
        break;
      case 'compare':
        setTimeout(() => {
          arrayBars[data[0]].style.backgroundColor = 'red';
          arrayBars[data[1]].style.backgroundColor = 'red';
        }, timer);
        timer += timeDelay;
        break;

      case 'chosen':
        /* chosne case is use in merge sort and quick sort, in merge sort, the bar after compare will be chosen and painted green, in quick sort, the anchor bar will be chosen and painted yellow.
         */
        //identify mark
        chosenMark = data.shift();
        let chosenColor = 'green';
        // step 1, change color for comparing bar
        setTimeout(() => {
          switch (chosenMark) {
            case 'anchor':
              chosenColor = 'Yellow';
              break;
            default:
              break;
          }
          arrayBars[data].style.backgroundColor = chosenColor;
        }, timer);
        timer += timeDelay;
        break;
      case 'replace':
        /* the replace case is use only in merge sort because the real algorithm in merge sort is spliting the data in smaller piece and merging them into a new array. In order to show this situation in only single array, we overwrite the data in the insertion index.
         */
        /* isfinal is to judge if the process is at the final step, if it is, it will be paint into ilght blue!
         */

        isFinal = data.shift();

        for (let [index, j] = [data[0], 2]; j < data.length; [index++, j++]) {
          // change height
          setTimeout(() => {
            arrayBars[index].style.height = `${data[j]}px`;
          }, timer);
          // finished change
          let color = isFinal ? '#00BBFF' : 'blue';
          setTimeout(() => {
            arrayBars[index].style.backgroundColor = color;
          }, timer + timeDelay);

          timer += 2 * timeDelay;
        }
        break;
      case 'switch':
        /* the switch case is use in qicuksort, bubble sort, and heap sort. There is an isFinal mark to check and will paint the data which was not need to change again to light blue. If the data is still needed to be sort, it will be paint in blue.
         */
        isFinal = data.shift();
        let color = isFinal ? '#00BBFF' : 'blue';
        // first mark two switch pair in green
        setTimeout(() => {
          arrayBars[data[0]].style.backgroundColor = 'green';
          arrayBars[data[1]].style.backgroundColor = 'green';
        }, timer);
        // switch their height
        setTimeout(() => {
          arrayBars[data[0]].style.height = `${data[2]}px`;
          arrayBars[data[1]].style.height = `${data[3]}px`;
        }, timer + timeDelay);
        // after switching, set their color back to blue or final color.
        setTimeout(() => {
          arrayBars[data[0]].style.backgroundColor = 'blue';
          arrayBars[data[1]].style.backgroundColor = color;
        }, timer + 2 * timeDelay);
        timer += 3 * timeDelay;
        break;
      case 'recoverColor':
        /*
        recover color is used in in qicuksort, bubble sort, and heap sort. This step is used for recover their color after comparing step or switch step.
         */
        let recoverIndex = data.length <= 1 ? [data] : [...data];
        setTimeout(() => {
          for (let i = 0; i < recoverIndex.length; i++) {
            arrayBars[recoverIndex[i]].style.backgroundColor = 'blue';
          }
        }, timer);
        timer += timeDelay;
        break;
      case 'finish':
        /*
        finish is used in in qicuksort, bubble sort, and heap sort. This step is used for marking the finish comparing data.
         */
        let finishIndex = data.length <= 1 ? [data] : [...data];
        setTimeout(() => {
          for (let i = 0; i < finishIndex.length; i++) {
            arrayBars[finishIndex[i]].style.backgroundColor = '#00BBFF';
          }
        }, timer);
        timer += timeDelay;
        break;
      case 'animationEnd':
        /*
        this step will be automatically add in the end of the animation to print out the time and change the btn to clickable again
        */
        let endTime = timer / 1000;
        setTimeout(() => {
          document.getElementById(
            'timer'
          ).innerText = `Spend time: ${endTime} sec`;
          for (const element of closeBtn) {
            element.style.pointerEvents = 'auto';
          }
          for (const element of closeInput) {
            element.style.pointerEvents = 'auto';
          }
        }, timer);
        break;
      default:
        break;
    }
  }
}
export default changeBarHeight;
