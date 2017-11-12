"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = // Object.setPrototypeOf ||
        // ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Animal = /** @class */ (function () {
    function Animal() {
        Animal.population++;
    }
    Animal.printPopulation = function () {
        console.log("Bird population: " + Bird.population + ", Fish population: " + Fish.population + ", Animal population: " + Animal.population);
    };
    Animal.population = 0;
    return Animal;
}());
exports.Animal = Animal;
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    //static population = 0;
    function Bird() {
        var _this = _super.call(this) || this;
        Bird.population++;
        return _this;
    }
    return Bird;
}(Animal));
exports.Bird = Bird;
var Fish = /** @class */ (function (_super) {
    __extends(Fish, _super);
    //static population = 0;
    function Fish() {
        var _this = _super.call(this) || this;
        Fish.population++;
        return _this;
    }
    Fish.printPopulation = function () {
        console.log("From Fish.printPopulation: Bird population: " + Bird.population + ", Fish population: " + Fish.population + ", Animal population: " + Animal.population);
    };
    return Fish;
}(Animal));
exports.Fish = Fish;
new Bird();
Animal.printPopulation();
new Bird();
Bird.printPopulation();
new Fish();
Fish.printPopulation();
new Fish();
Animal.printPopulation();
