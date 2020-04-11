const animations = [];
let arrayLength;

export function getHeapSortAnimations(array) {
  if (array.length <= 1) return array; //error catch array too small to be sorted

  //console.log("init array");
  //printArray(array);

  heapSort(array);
  //return array;
  return animations;
}

function heapSort(array) {
  buildHeap(array);

  //console.log("return from buildheap");
  //printArray(array);

  for (let i = array.length - 1; i > 0; i--) {
    //console.log("for loop " + i);
    swap(array, 0, i);
    arrayLength--;
    heapify(array, 0);
  }
}

function buildHeap(array) {
  arrayLength = array.length;

  for (let i = Math.floor(arrayLength / 2); i >= 0; i--) {
    heapify(array, i);
  }
}

function heapify(array, i) {
  //let normState = 0;
  let left = i * 2 + 1;
  let right = left + 1;
  let largest = i;

  if (left < arrayLength && array[left] > array[largest]) {
    //if we want to show us creating a max heap. it looks awkward tho
    //animations.push([left, array[left], largest, array[largest], normState]);
    largest = left;
  }
  if (right < arrayLength && array[right] > array[largest]) {
    //animations.push([right, array[right], largest, array[largest], normState]);
    largest = right;
  }
  if (largest !== i) {
    swap(array, i, largest);
    heapify(array, largest);
  }
}

function swap(array, a, b) {
  //console.log("call swap " + array[a] + " " + array[b]);
  let swapState = 1;
  let x = array[a];
  let y = array[b];

  animations.push([a, x, b, y, swapState]);

  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
/*
function printArray(array) {
  if (typeof array[0] == "undefined") {
    console.log("Undefined array");
    return;
  }
  for (let i = 0; i < array.length; i++) {
    console.log("[" + array[i] + "]");
  }
}
*/
