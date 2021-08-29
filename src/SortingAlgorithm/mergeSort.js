export function mergeSortAnimation(arr) {
    const length = arr.length;
    if (length <= 1) return arr;
    const animation = [];
    const dupArr = arr.slice();
    mergeSortHelper(arr.slice(), dupArr, animation, 0, length - 1);
    // console.log('arr:',arr);
    return animation;
}

function mergeSortHelper(arr, dupArr, animation, startIdx, endIdx) {
    if (startIdx === endIdx) return;
    const midIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(dupArr,arr , animation, startIdx, midIdx);
    mergeSortHelper(dupArr,arr, animation, midIdx + 1, endIdx);
    doMerge(arr, dupArr, animation, startIdx, midIdx, endIdx);
}

function doMerge(arr, dupArr, animation, startIdx, midIdx, endIdx) {
    let k = startIdx, i = startIdx;
    let j = midIdx + 1;

    while (i <= midIdx && j <= endIdx) {
        animation.push([i, j]);// change color
        animation.push([i, j]);// revert color

        if (dupArr[i] <= dupArr[j]) {
            animation.push([k, dupArr[i]]);
            arr[k++] = dupArr[i++];
        } else {
            animation.push([k, dupArr[j]]);
            arr[k++] = dupArr[j++];
        }

    }
    while (i <= midIdx) {

        animation.push([i, i]);// change color
        animation.push([i, i]);// revert color
        animation.push([k, dupArr[i]]);
        arr[k++] = dupArr[i++];
    }
    while (j <= endIdx) {
        animation.push([j, j]);// change color
        animation.push([j, j]);// revert color
        animation.push([k, dupArr[j]]);
        arr[k++] = dupArr[j++];
    }

}
