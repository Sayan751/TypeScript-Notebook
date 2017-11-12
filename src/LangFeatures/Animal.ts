export class Animal {
    static population = 0;
    constructor() {
        Animal.population++;
    }

    static printPopulation(){
        console.log(`Bird population: ${Bird.population}, Fish population: ${Fish.population}, Animal population: ${Animal.population}`);
    }
}

export class Bird extends Animal {
    //static population = 0;
    constructor() {
        super();
        Bird.population++;
    }
}

export class Fish extends Animal {
    //static population = 0;
    constructor() {
        super();
        Fish.population++;
    }
    static printPopulation = function () {
        console.log(`From Fish.printPopulation: Bird population: ${Bird.population}, Fish population: ${Fish.population}, Animal population: ${Animal.population}`);
    }
}

new Bird();
Animal.printPopulation();
new Bird();
Bird.printPopulation();
new Fish();
Fish.printPopulation();
new Fish();
Animal.printPopulation();