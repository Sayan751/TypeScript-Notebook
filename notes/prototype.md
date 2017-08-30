# Notes on `prototype` and `__proto__` #

- [Notes on `prototype` and `__proto__`](#notes-on-`prototype`-and-`proto`)
    - [`__proto__`](#`proto`)
    - [`prototype`](#`prototype`)
    - [`__proto__` and inheritance](#`proto`-and-inheritance)
    - [`Object.create` and inheritance](#`objectcreate`-and-inheritance)
    - [`extends` in TypeScript and inheritance](#`extends`-in-typescript-and-inheritance)

## `__proto__` ##

Every JavaScript object has a property called `__proto__`. Example:

```javascript
var obj = {a: 10};
console.log(obj);           // { a: 10 }
console.log(obj.__proto__); // {}
```

The example above shows that `__proto__` of `obj` is defined but empty.

When we try to access the member of an object (like `object.member`), JavaScript looks up for the member in `__proto__` of the object if the member is not found in the object itself (like `object.__proto__.member`). If the member is still not found in `object.__proto__`, then it tries for `object.__proto__.__proto__.member` till either: it is found or the latest `.__proto__` itself is `null`. This explains why JavaScript is said to support prototypal inheritance out of the box.

```javascript
var obj = {
    a: 10
};
obj.__proto__.a = 20;

console.log(obj.a); // 10

delete obj.a;

console.log(obj.a); // 20
```

## `prototype` ##

Every `function` `f` in JavaScript also has a property called `prototype`, which has a property `constructor` which points to `f` itself. Example:

```javascript
function MyFun() {}
console.log(MyFun);                                 // [Function: MyFun]
console.log(MyFun.__proto__);                       // [Function]
console.log(MyFun.prototype);                       // MyFun {}
console.log(MyFun.prototype.constructor);           // [Function: MyFun]
console.log(MyFun.prototype.constructor === MyFun); // true
```

## `__proto__` and inheritance ##

Because JavaScript tries to fetch member from `__proto__` recursively, `__proto__` is useful to implement prototypical inheritance.
A simple way to implement inheritance would be to assign `<Base>.prototype` to `__proto__.__proto__` to an object which wants capabilities of `<Base>`. Example:

```javascript
// We have two classes (function in pure JavaScript) Animal, and Bird
function Animal() {}
Animal.prototype.walk = function () { console.log("Walk"); }

function Bird() {}
Bird.prototype.fly = function () { console.log("Fly"); }

var bird = new Bird();
bird.fly();         // Fly
bird.walk();        // Throws error.

// However, if we do the following, then...
bird.__proto__.__proto__ = Animal.prototype;
// ... it works.
bird.walk(); // Walk

console.log("Is bird a Bird? " + (bird instanceof Bird) + ", Is bird an Animal? " + (bird instanceof Animal));  // Is bird a Bird? true, Is bird an Animal? true
```

We note here that `fly` is defined on `Bird.prototype`, and we access that from `bird` object. This is possible as `fly` is made available to `bird.__proto__`, by `new Bird()`.

In fact, `var bird = new Bird()` assigns `Bird.prototype` to `bird.__proto__`. In JavaScript, this makes all members defined on class level (i.e. `Type.prototype`, here `Bird.prototype`) to the instances of that class (Refer [this](https://stackoverflow.com/a/14593952/2270340)).

The fact that `bird.__proto__ === Bird.prototype` enables us to write the inheritance for the `Bird` class from `Animal` class more concisely, as follows.

```javascript
// We have two classes (function in pure JavaScript) Animal, and Bird
function Animal() {}
Animal.prototype.walk = function () { console.log("Walk"); }

function Bird() {}
Bird.prototype.fly = function () { console.log("Fly"); }
Bird.prototype.__proto__ = Animal.prototype;  //<-- Nice!

var bird = new Bird();
bird.fly();         // Fly
bird.walk();        // Walk

console.log("Is bird a Bird? " + (bird instanceof Bird) + ", Is bird an Animal? " + (bird instanceof Animal));  // Is bird a Bird? true, Is bird an Animal? true
```

**Note:** From [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof):
>The `instanceof` operator tests whether an object in its prototype chain has the prototype property of a constructor.

So far our inheritance implementation works quite good. So, lets consider other scenarios. With inheritance, we can access the instance-scoped properties of the class. Let's see if we can do that using our implementation of inheritance. So, let's add new properties to the classes.

```javascript
function Animal() { this.claws = "An animal has claws"; }

function Bird() { this.wings = "A bird has wings"; }
Bird.prototype.__proto__ = Animal.prototype;

var bird = new Bird();
console.log(bird.wings); // A bird has wings
console.log(bird.claws); // undefined
```

So we see that using our current implementation, we can't access the instance-scoped property `claws` which is defined in `Animal`.

However, before delving into that, let's quickly discuss what `this` means with `new Bird()`. From [TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/content/docs/classes-emit.html):
>... let's look at effect of `new` on `this` inside the called function. Basically `this` inside the called function is going to point to the newly created object that will be returned from the function. ...

Example:

```javascript
var bird = new Bird();
console.log(bird.wings);           // A bird has wings
console.log(bird.__proto__.wings); // undefined
```

So, from the example we see that `this` in the function eventually points to `bird` object (instance of `Bird`), and thereby making all the properties declared on `this` inside the function, available to the `bird` object. Additionally we also note that `wings` exists directly on `bird` object and not on `bird.__proto__`.

So to reuse the properties defined in base classes from the instance of the derived classes, we need to *put* the properties of base class to the `this` object of derived class. The common way to achieve this is to call the constructor of base class from the constructor of derived class (like we do in C#, or Java).

```javascript
function Animal() { this.claws = "An animal has claws"; }

function Bird() {
    Animal.call(this); // Calling the constructor of Animal, passing this as current object.
    this.wings = "A bird has wings";
}
Bird.prototype.__proto__ = Animal.prototype;

var bird = new Bird();
console.log(bird.wings); // A bird has wings
console.log(bird.claws); // An animal has claws
```

So the trick to call the constructor of `Animal` class is to use `Animal.call(this);` in constructor of `Bird`. Here we need a few words about `function.call`. From [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call):
>The `call()` method calls a function with a given `this` value and arguments provided individually.

Syntax:
>```function.call(thisArg, arg1, arg2, ...)```
Where `thisArg` is
>The value of this provided for the call to a function. ...

and `arg1, arg2, ...` are
>Arguments for the function.

A quick example of `function.call` is following.

```javascript
function aggregate(prefix) {
    console.log(`${prefix} ${this.prop1+this.prop2}`);
}

var thisObj1 = { prop1: 10, prop2: 20 };
var thisObj2 = { prop1: "Hello", prop2: "World" };

aggregate.call(thisObj1, "thisObj1 aggregated:"); // thisObj1 aggregated: 30
aggregate.call(thisObj2, "thisObj2 aggregated:"); // thisObj2 aggregated: HelloWorld
```

We see that based on different values of `thisArg` parameter we can produce different results from the same function.

And this is what is done to inherit the instance-scoped properties from the Base class. So we call `Base.call(this)` from the constructor of `Derived`, where `this` points to the instance of `Derived` being constructed, and thereby *putting* the properties of `Base` to the instance of `Derived`.

On ground level that's all we need to implement inheritance in JavaScript.

## `Object.create` and inheritance ##

However, as the property `__proto__` is not *conveniently* available (for example in IDE and such), another way to write the same thing would be to use `Object.create`.

The syntax of `Object.create` is as follows:

```javascript
Object.create(proto[, propertiesObject])
```

`Object.create` creates an object, prototype of which is of type as provided by `proto`. <small>By using the second and optional `propertiesObject` additional properties to be added to the newly created object can be specified. Though, it can be useful to provide closure, we are skipping that discussion for now (Refer [this](https://stackoverflow.com/a/4166723/2270340)).</small>

Example:

```javascript
// create an object that does not inherit from anything.
var obj = Object.create(null);
console.log(obj.__proto__); // undefined

// create derv that inherit from base
var base = { b: "base" };
var derv = Object.create(base, {
    d: {
        get: function () { return "derived"; }
    }
});

console.log(derv.d);                    // derived
console.log(derv.b);                    // base
console.log(derv.__proto__ === base);   // true
```

So, how `Object.create` can be used to implement inheritance? Well, we know that for inheritance we need `Derived.prototype.__proto__ = Base.prototype`. From the above example, we can see that `Object.create` assigns `base` to `derv.__proto__`. Then to implement inheritance with `Object.create`, we simply need to do `Derived.prototype = Object.create(Base.prototype)`.

However, there are couple of things to note here. We'll discuss these with our working example of `Animal` and `Bird`.

```javascript
function Animal() {}
Animal.prototype.walk = function () { console.log("Walk"); }

function Bird() {}
Bird.prototype.fly = function () { console.log("Fly"); }

// inherit from Animal
Bird.prototype = Object.create(Animal.prototype);

// now lets create a Bird object.
var bird = new Bird();

// and check for type of bird
console.log("Is bird a Bird? " + (bird instanceof Bird) + ", Is bird an Animal? " + (bird instanceof Animal));           // Is bird a Bird? true, Is bird an Animal? true // works!
bird.walk();        // Walk
bird.fly();         // TypeError: bird.fly is not a function // Wait... what?
```

So we see that in the above example, `bird.fly()` does not work. The reason for that is very simple. `fly` is defined on `Bird.prototype`. However, after defining `fly` on `Bird.prototype`, `Bird.prototype` was replaced, and thus, the `fly` is not accessible any more. So the trick is to declare any member on `Derived.prototype` after `Derived.prototype` is assigned `Object.create(Base.prototype)`. So, the correction for this problem would be as follows.

```javascript
// Omitting Animal for brevity
function Bird() {}
Bird.prototype = Object.create(Animal.prototype);

Bird.prototype.fly = function () { console.log("Fly"); }

var bird = new Bird();
console.log("Is bird a Bird? " + (bird instanceof Bird) + ", Is bird an Animal? " + (bird instanceof Animal));           // Is bird a Bird? true, Is bird an Animal? true
bird.walk();        // Walk
bird.fly();         // Fly // works!
```

However, it still has one caveat though. Remember that `prototype` of every `function` has a property called `constructor`, which points to the function itself? So, [from MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor) we know that `prototype.constructor`
>Returns a reference to the Object constructor function that created the instance object. Note that the value of this property is a reference to the function itself...

So, lets see what happens to `prototype.constructor` with this implementation of inheritance.

```javascript
// Omitting more code for brevity
function Bird() {}
Bird.prototype = Object.create(Animal.prototype);

var bird = new Bird();
console.log(bird.constructor); // [Function: Animal] // Why?
```

In the example we see that `bird.constructor` refers to `Animal`. So, this is obvious as `Bird.prototype = Object.create(Animal.prototype);` also assigns `Animal.prototype.constructor` (which is `Animal`) to `Bird.prototype.__proto__.constructor`. So, if we leave our inheritance implementation at this, we violate the definition of `prototype.constructor`. Then, it is a good practice to restore the `constructor`.

```javascript
// Omitting more code for brevity
function Bird() {}
Bird.prototype = Object.create(Animal.prototype);
Bird.prototype.constructor = Bird;

var bird = new Bird();
console.log(bird.constructor); // [Function: Bird]
```

## `extends` in TypeScript and inheritance ##

TODO