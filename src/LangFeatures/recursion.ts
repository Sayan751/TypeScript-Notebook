function sumArr(arr: number[]) {
    if (arr.length === 1) {
        return arr[0];
    } else {
        return arr[0] + sumArr(arr.slice(1));
    }
}

console.log(sumArr([1, 2, 3, 4]));

function sumArrTailRec(arr: number[], acc: number = 0) {
    if (arr.length === 0) {
        return acc;
    } else {
        return sumArrTailRec(arr.slice(1), acc + arr[0]);
    }
}

console.log('tail recursion: '+sumArr([1, 2, 3, 4]));