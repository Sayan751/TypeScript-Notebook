const obja = {
    a: 1,
    b: 2
};
const objb = {
    c: 3,
    b: 22
};

const obj = { ...obja,
    ...objb
};

console.log(obj);