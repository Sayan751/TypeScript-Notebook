type piece = { f: number, s: number };
const pieces: piece[] = [
    { f: 1, s: 5 }, { f: 3, s: 1 }, { f: 5, s: 9 }, { f: 8, s: 3 }, { f: 4, s: 2 },
    { f: 9, s: 0 }, { f: 0, s: 6 }, { f: 6, s: 7 }, { f: 7, s: 4 }, { f: 2, s: 22 }
];

const constraint = (a: piece, b: piece, c: piece) => a.s === b.f && b.s === c.f;

let solution;

const permutations: IterableIterator<piece[]> = getPiecesPermutation();
const permutation: piece[] = permutations.next().value();
while (permutation) {
    const solnFound = permutation
        .every((currentItem, index, arr) =>
            (index !== 0 || index !== arr.length - 1)
                ? constraint(arr[index - 1], currentItem, arr[index + 1])
                : true);
    if (solnFound) {
        solution = permutation;
        break;
    }
}