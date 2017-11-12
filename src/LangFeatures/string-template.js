// a sample tag function
function htmlEscape(literals) {
    var placeholders = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        placeholders[_i - 1] = arguments[_i];
    }
    console.log(literals);
    console.log(placeholders);
    var result = "";
    // interleave the literals with the placeholders
    for (var i = 0; i < placeholders.length; i++) {
        result += literals[i];
        result += placeholders[i]
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
    // add the last literal
    result += literals[literals.length - 1];
    return result;
}
var say = "a bird in hand > two in the bush";
var html = (_a = ["<div> I would just like to say : ", "</div>"], _a.raw = ["<div> I would just like to say : ", "</div>"], htmlEscape(_a, say));
console.log(html);
var _a;
