const arrayBars = document.getElementsByClassName('bar');
const closeBtn = document.getElementsByTagName('button');
const closeInput = document.getElementsByTagName('input');
// const timeStep = 1000
// function changeBarHeight(animation, timeDelay = 100) {
function changeBarHeight(inputAnimation, timeDelay = 100) {
  let timer = 0;
  const animation = [...inputAnimation, ['animationEnd']];
  // const startingTime = new Date().getTime();
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
        // Totally 2 step
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
        isFinal = data.shift();
        // start index is data[0] end index is data[1]
        let index = data[0];
        for (let j = 2; j < data.length; j++) {
          // change height
          setTimeout(() => {
            arrayBars[index].style.height = `${data[j]}px`;
          }, timer);
          // finished change
          let color = isFinal ? '#00BBFF' : 'blue';
          setTimeout(() => {
            arrayBars[index].style.backgroundColor = color;
            index++;
          }, timer + timeDelay);

          timer += 2 * timeDelay;
        }
        break;
      case 'switch':
        isFinal = data.shift();
        let color = isFinal ? '#00BBFF' : 'blue';
        setTimeout(() => {
          arrayBars[data[0]].style.backgroundColor = 'green';
          arrayBars[data[1]].style.backgroundColor = 'green';
        }, timer);
        setTimeout(() => {
          arrayBars[data[0]].style.height = `${data[2]}px`;
          arrayBars[data[1]].style.height = `${data[3]}px`;
        }, timer + timeDelay);
        setTimeout(() => {
          arrayBars[data[0]].style.backgroundColor = 'blue';
          arrayBars[data[1]].style.backgroundColor = color;
        }, timer + 2 * timeDelay);
        timer += 3 * timeDelay;
        break;
      case 'recoverColor':
        let recoverIndex = data.length <= 1 ? [data] : [...data];
        setTimeout(() => {
          for (let i = 0; i < recoverIndex.length; i++) {
            arrayBars[recoverIndex[i]].style.backgroundColor = 'blue';
          }
        }, timer);
        timer += timeDelay;
        break;
      case 'finish':
        let finishIndex = data.length <= 1 ? [data] : [...data];
        setTimeout(() => {
          for (let i = 0; i < finishIndex.length; i++) {
            arrayBars[finishIndex[i]].style.backgroundColor = '#00BBFF';
          }
        }, timer);
        timer += timeDelay;
        break;
      case 'animationEnd':
        setTimeout(() => {
          console.log('Finished playing animation!');
          document.getElementById('timer').innerText = `Spend time: ${
            timer / 1000
          } sec`;
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
