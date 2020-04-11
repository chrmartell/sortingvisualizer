/*
 *
 */

export async function getQuickSortAnimations(array) {
  const animations = [];

  if (array.length <= 1) return array; //error catch array too small to be sorted

  await Promise.all([quickSort(array, 0, array.length - 1, animations)]);

  return animations;
}

async function quickSort(array, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) {
    return;
  }
  let index = await partition(array, startIdx, endIdx, animations);

  await Promise.all([
    quickSort(array, startIdx, index - 1, animations),
    quickSort(array, index + 1, endIdx, animations)
  ]);
}

async function partition(array, startIdx, endIdx, animations) {
  let normState = 0;
  let pivotValue = array[endIdx];
  let pivotIndex = startIdx;

  for (let i = startIdx; i < endIdx; i++) {
    let a = array[i];
    let b = array[endIdx];

    if (array[i] < pivotValue) {
      await swap(array, i, pivotIndex, animations);
      pivotIndex++;
    } else {
      animations.push([i, a, endIdx, b, normState]);
    }
  }
  await swap(array, pivotIndex, endIdx, animations);
  return pivotIndex;
}

async function swap(array, a, b, animations) {
  let swapState = 1;
  let x = array[a];
  let y = array[b];

  animations.push([a, x, b, y, swapState]);

  let temp = array[a];
  array[a] = array[b]; //swapping in mainArray
  array[b] = temp; //swapping in mainArray
}
