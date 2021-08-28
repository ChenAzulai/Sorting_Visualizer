export function bubbleSortAnimation(arr) {
    const animation = [];
    const dupArr = arr.slice();
    bubbleSortHelper(dupArr, animation, dupArr.length);
    return animation;
}


function bubbleSortHelper(dupArr, animation, len) {
    let iters = len - 1;
    let swapped = true;
    while (iters && swapped) {
        swapped = false;
        for (let i = 0; i < iters ; i++) {
            animation.push([i, i + 1]);
            animation.push([i, i + 1]);
            if (dupArr[i] > dupArr[i + 1]) {
                swapped = true;
                animation.push([i, i + 1]);
                swap(dupArr, i, i + 1);
            } else {
                animation.push(['none']);
            }
        }
        iters--;
    }
}

function swap(dupArr, idx1, idx2) {
    const temp = dupArr[idx1];
    dupArr[idx1] = dupArr[idx2];
    dupArr[idx2] = temp;
}