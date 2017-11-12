var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var obja = {
    a: 1,
    b: 2
};
var objb = {
    c: 3,
    b: 22
};
var obj = __assign({}, obja, objb);
console.log(obj);
