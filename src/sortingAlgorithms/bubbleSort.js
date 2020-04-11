export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  //const auxiliaryArray = array.slice();
  bubbleSortHelper(array, animations);
  return animations;
}

function bubbleSortHelper(array, animations) {
  let normState = 0;
  let swapState = 1;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      let a = array[j];
      let b = array[j + 1];
      if (a > b) {
        animations.push([j, a, j + 1, b, swapState]);
        swap(array, j, j + 1);
      } else {
        animations.push([j, a, j + 1, b, normState]);
      }
    } //end j for loop
  } //end i for loop
}

function swap(array, a, b) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
