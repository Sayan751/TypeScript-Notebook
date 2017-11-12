var inheritStatics = function (derived, base) {
    for (var p in base)
        if (base.hasOwnProperty(p)) derived[p] = base[p];
};

function Animal() {
    Animal.population++;
}
Animal.population = 0;
Animal.printPopulation = function () {
    console.log(`Animal population: ${Animal.population}, Bird population: ${Bird.population}, Fish population: ${Fish.population}`);
}

function Bird() {
    Animal.call(this);
    Bird.population++;
}

function Fish() {
    Animal.call(this);
    Fish.population++;
}
Object.setPrototypeOf(Bird, Animal);
Object.setPrototypeOf(Fish, Animal);
// inheritStatics(Bird, Animal);
// inheritStatics(Fish, Animal);

new Bird();
Animal.printPopulation();
new Bird();
Animal.printPopulation();
new Fish();
Animal.printPopulation();
