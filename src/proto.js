var obj = {
    a: 10
};
console.log(obj);
console.log(obj.__proto__);

console.log("--------------------");
obj.__proto__.a = 20;
console.log(obj.a);
delete obj.a;
console.log(obj.a);

console.log("--------------------");

function MyFun() {}
console.log(MyFun);
console.log(MyFun.__proto__);
console.log(MyFun.prototype);
console.log(MyFun.prototype.constructor);
console.log(MyFun.prototype.constructor === MyFun);

console.log("--------------------");

function Animal() {
    this.animalProp = "this is a property of animal";
}
Animal.prototype.walk = function () {
    console.log("Walk");
}

function Bird() {
    this.birdProp = "this is a property of bird";
}
Bird.prototype.fly = function () {
    console.log("Fly");
}
Bird.prototype.__proto__ = Animal.prototype;

var bird = new Bird();
bird.fly();
// bird.walk();
// bird.__proto__.__proto__ = Animal.prototype;
bird.walk();

console.log("Is bird a Bird? " + (bird instanceof Bird) + ", Is bird an Animal? " + (bird instanceof Animal));
console.log(bird.birdProp);
console.log(bird.animalProp);

var bird1 = new Bird();
bird1.fly();
bird1.walk();

console.log(bird.__proto__ === Bird.prototype, bird1.__proto__ === Bird.prototype);

console.log("--------------------");

var base = {
    b: "base"
};
var derv = Object.create(base, {
    d: {
        get: function () {
            return "derived";
        }
    }
});

console.log(derv.d);
console.log(derv.b);
console.log(derv.__proto__ === base);

console.log("--------------------");

function Animal1() {
    this.animalProp = "this is a property of animal";
}
Animal1.prototype.walk = function () {
    console.log("Walk");
}

function Bird1() {
    //Animal1.call(this);
    this.birdProp = "this is a property of bird";
}

Bird1.prototype = Object.create(Animal1.prototype);
// console.log(Bird1.prototype.constructor);
Bird1.prototype.constructor = Bird1;
// console.log(Bird1.prototype.constructor);
Bird1.prototype.fly = function () {
    console.log("Fly");
}
var newBird = new Bird1();
newBird.walk();
newBird.fly();
console.log(newBird.birdProp);
console.log(newBird.animalProp);
console.log(
    `Is a bird? ${newBird instanceof Bird1},
Is an animal? ${newBird instanceof Animal1},
newBird.__proto__ === Bird1.prototype? ${newBird.__proto__ === Bird1.prototype},
newBird.constructor === Bird1? ${newBird.constructor === Bird1},
newBird.constructor === Animal1? ${newBird.constructor === Animal1}`
);

console.log(newBird.constructor);
console.log(newBird.__proto__.constructor);
console.log(newBird.__proto__.__proto__.constructor);
console.log(newBird.__proto__.__proto__.__proto__.constructor);

console.log("--------------------");

var obj = Object.create(null, {
    prop1: {
        get: function () {
            return "prop1";
        }
    }
});

console.log(obj.__proto__ === Object);
console.log(obj.prop1);

console.log("--------------------");

function Animal() {
    this.claws = "An animal has claws";
}

function Bird() {
    Animal.call(this);
    this.wings = "A bird has wings";
}
Bird.prototype.__proto__ = Animal.prototype; //<-- Nice!

var bird = new Bird();
console.log(bird.wings);
console.log(bird.__proto__.wings);
console.log(bird.claws);

console.log("--------------------");

function aggregate(prefix) {
    console.log(`${prefix} ${this.prop1+this.prop2}`);
}

var thisObj1 = {
    prop1: 10,
    prop2: 20
};
var thisObj2 = {
    prop1: "Hello",
    prop2: "World"
};

aggregate.call(thisObj1, "thisObj1 aggregated:");
aggregate.call(thisObj2, "thisObj2 aggregated:");

console.log("--------------------");

function StaticDemo(prop1) {
    this.instanceProp = prop1;
    StaticDemo.staticProp++;
}
StaticDemo.staticProp = 0; // a static property
StaticDemo.prototype.print = function () {
    console.log(`Instance prop: ${this.instanceProp}, static prop: ${StaticDemo.staticProp}`);
}

var instance1 = new StaticDemo(10);
instance1.print(); // Instance prop: 10, static prop: 1
var instance2 = new StaticDemo(20);
instance1.print(); // Instance prop: 10, static prop: 2
instance2.print(); // Instance prop: 20, static prop: 2

console.log("--------------------");
var inheritStatics = function (derived, base) {
    for (var p in base)
        if (base.hasOwnProperty(p)) derived[p] = base[p];
};

function Animal() {
    this.claws = "An animal has claws";
    Animal.population++;
}
Animal.population = 0;
Animal.printPopulation = function () {
    console.log(`Bird population: ${Bird.population}, Fish population: ${Fish.population}, Animal population: ${Animal.population}`);
}

function Bird() {
    Animal.call(this); // Calling the constructor of Animal, passing this as current object.
    this.wings = "A bird has wings";
    Bird.population++;
}
inheritStatics(Bird, Animal);
Bird.prototype.__proto__ = Animal.prototype;

function Fish() {
    Animal.call(this); // Calling the constructor of Animal, passing this as current object.
    this.fins = "A bird has fins";
    Fish.population++;
}
inheritStatics(Fish, Animal);
Fish.prototype.__proto__ = Animal.prototype;
Fish.printPopulation = function(){
    console.log(`From Fish.printPopulation: Bird population: ${Bird.population}, Fish population: ${Fish.population}, Animal population: ${Animal.population}`);
}

new Bird();
Animal.printPopulation();
new Bird();
Bird.printPopulation();
new Fish();
Fish.printPopulation();
new Fish();
Animal.printPopulation();
console.log(Animal.printPopulation === Bird.printPopulation, Animal.printPopulation === Fish.printPopulation);

console.log("--------------------");

var obj1 = {
    prop1: 1,
    innerObj: {
        inner1: 10
    }
};

var obj2 = {
    propa: "A"
};

inheritStatics(obj2, obj1);
console.log(obj2);
console.log(obj1.innerObj === obj2.innerObj);