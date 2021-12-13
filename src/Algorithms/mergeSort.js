function mergeSort(data) {
  const animation = [];
  function mergeTwoList(
    replaceData,
    helperData,
    startIndex,
    middleIndex,
    endIndex,
    animation
  ) {
    //When merge, replace data is not important, its just a container to record replace index and value, you can even copy the replacedata in the function, but may cause some space wasted problem!
    let i = startIndex;
    let j = middleIndex + 1;
    // k is the replace array index
    let k = startIndex;
    let isFinal =
      endIndex - startIndex === helperData.length - 1 ? true : false;
    // mark left and right
    let replaceAnimation = ['replace', isFinal, startIndex, endIndex];
    animation.push(['region', startIndex, middleIndex, endIndex]);
    while (i <= middleIndex && j <= endIndex) {
      animation.push(['compare', i, j]);
      if (helperData[i] < helperData[j]) {
        animation.push(['chosen', '', i]);
        replaceAnimation.push(helperData[i]);
        replaceData[k++] = helperData[i++];
      } else {
        animation.push(['chosen', '', j]);
        replaceAnimation.push(helperData[j]);
        // animation.push([k, helperData[j]])
        replaceData[k++] = helperData[j++];
      }
    }
    while (i <= middleIndex) {
      animation.push(['chosen', '', i]);
      replaceAnimation.push(helperData[i]);
      replaceData[k++] = helperData[i++];
    }
    while (j <= endIndex) {
      animation.push(['chosen', '', j]);
      replaceAnimation.push(helperData[j]);
      replaceData[k++] = helperData[j++];
    }
    animation.push(replaceAnimation);
    return replaceData;
  }
  function splitAndMerge(data, helperData, startIndex, endIndex, animation) {
    // the helperdata is used to help compare which value is bigger in the array(which is a copy of original data), and data is to store the switch result.
    const middleIndex = Math.trunc((startIndex + endIndex) / 2);
    if (startIndex >= endIndex) {
      return;
    } else {
      splitAndMerge(helperData, data, startIndex, middleIndex, animation);
      splitAndMerge(helperData, data, middleIndex + 1, endIndex, animation);
      return mergeTwoList(
        data,
        helperData,
        startIndex,
        middleIndex,
        endIndex,
        animation
      );
    }
  }
  const result = splitAndMerge(
    data,
    data.slice(),
    0,
    data.length - 1,
    animation
  );
  return [result, animation];
}
export default mergeSort;
