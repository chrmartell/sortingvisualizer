export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  //The slice() method returns the selected elements in an array, as a new array object.
  //The slice() method selects the elements starting at the given start argument, and ends at, but does not include, the given end argument.
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}
//Recursively calls itself to divide the array till size becomes one.
function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  /*
   * Divide input array in two halves and calls itself for the two halves.
   * Then merge the two sorted halves.
   * Step 1: Break the original all the way down into pairs then compare those two.
   * Step 2: Add pairs to another pair and work your way back up the tree merge sorting those smaller pieces till you assemble a whole array.
   * */
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2); //get the middle index of the array
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations); //recursion
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations); //recursion
  //After dividing the array into smallest units merging starts, based on comparison of elemnts
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
//Used for merging two halves
function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
