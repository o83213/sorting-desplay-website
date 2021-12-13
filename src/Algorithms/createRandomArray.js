function randomIntFromInterval(min, max) {
  return Math.trunc(Math.random() * (max - min + 1) + min);
}
function createRandomArray(arraySize = 4) {
  const newArray = [];
  for (let i = 0; i < arraySize; i++) {
    newArray.push(randomIntFromInterval(5, 500));
  }
  return newArray;
}

export default createRandomArray;
