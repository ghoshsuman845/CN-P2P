// function foo() {
//   var c = 10;

//   function bar() {
//     var b = 20;
//     console.log(a, b);
//   }
//   bar();
// }

// {
//   var a = 5;
// }
// foo();

// var a = 1; // global or function scoped
// let b = 2; // block scoped
// const c = 3;

// console.log(a, b, c);

// if (true) {
//   var a = 10;
//   let b = 20;
//   const c = 30;
//   console.log(a, b, c);
// }

// function foo() {
//   var x = 100;
//   let y = 200;
//   const z = 300;
//   console.log(x, y, z);
// }

// foo();

// console.log(x);
// console.log(y);
// console.log(z);

// const a = 10;

// {
//   console.log(a); // 10
//   const a = 20;
//   console.log(a); // 20
// }

// console.log(a); // 20

// // Global scope (script)
// // a = 20

// // Local scope (block)

// function parent() {
//   var house = "WhiteHouse";

//   function child() {
//     var car = "Tesla";
//     console.log("I have:", car);
//   }

//   return child;
// }
// var legacy = parent();
// console.log(legacy);
// legacy();

// global scope
// legacy = func child
// legacy() => child()

// child - local scope
// car = undef
// house = WhiteHouse

// function grandParent() {
//   var house = "GreenHouse";
//   console.log(house);

//   function parent() {
//     var car = "Tesla";
//     house = "YellowHouse";
//     console.log(house);

//     function child() {
//       var scooter = "Vespa";
//       console.log("I have:", house, car, scooter);
//     }

//     return child;
//   }

//   return parent;
// }
// grandParent()()();
// // parent func
// var legacyGenY = legacyGenX();
// console.log(legacyGenY); // child func
// legacyGenY();

// GEC : global scope
// legacyGenX = parent func();
// legacyGenY = child func();

// Closure (grandparent)
// house  = "GreenHouse" => "YellowHouse"

// Closure (parent)
// car : "Tesla"

// child EC : local scope
// scooter: vespa

// const url = "https://jsonplaceholder.typicode.com";

// const fetchUtility = (url, headers) => {
//   return (createFetchInstance = (route, reqMethod, data) => {
//     const tempReq = new Request(`${url}${route}`, {
//       method: reqMethod,
//       headers: headers,
//       data: JSON.stringify(data),
//     });
//     return [fetch, tempReq];
//   });
// };

// const fetchInstance = fetchUtility(url);
// const [getFunc, getReq] = fetchInstance("/todos/1", "GET", {});

// getFunc(getReq)
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// const [postFunc, postReq] = fetchInstance("/todos", "POST", {
//   title: "delectus aut autem",
//   completed: false,
// });

// postFunc(postReq)
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// function getMainData(url) {
//   return function (data) {
//     return `${url}${data}`;
//   };
// }

// const urlValue = getMainData("https://jsonplaceholder.typicode.com");
// console.log(urlValue);

// const dataValue = urlValue("/todos/1");
// console.log(dataValue);

// const dataValue2 = urlValue("/todos/2");
// console.log(dataValue2);

//create a counter using closures

// function counter() {
//   var counter = 0;
//   return {
//     add: function (count) {
//       counter += count;
//     },
//     show: function () {
//       console.log("counter : ", counter);
//     },
//   };
// }

// var count = counter();
// console.log(count);
// count.add(5);
// count.show(); // 5
// count.add(9);

// count.show(); // 14

// default binding: this points to global object
function myFunc() {
  console.log(this.a);
  // window.a;
}
let a = 5;
myFunc();
// global scope
// a = 5;
// myFunc
// window

// implicit binding: when a function is called as a method of an object,
//  the "this" keyword points to the object the method is called on.

function alert() {
  console.log(this.a);
  // this => obj
  // this.a => obj.a
}
var obj = {
  a: 2,
  func: alert,
  nestedObj: {
    a: 3,
    func: alert,
  },
};

console.log(obj.a);

obj.func();
obj.nestedObj.func(); // this => nestedObj

var john = {
  fname: "John",
  age: 25,
  greet: function (person) {
    console.log(this);
    console.log("Hello,", person, "my fname is " + this.fname);
  },
};
john.greet("mark");
var newVal = john.greet;
newVal("jane");

// explicit binding:
// call, apply, bind

function greet(car, bike) {
  console.log(`Hello, ${this.fname} I have ${car} and ${bike}`);
}

var person = {
  fname: "John",
};

var person2 = {
  fname: "Mark",
};

// syntax: func.call(obj, arg1, arg2, arg3, ...)
// syntax: func.apply(obj, [arg1, arg2, arg3, ...])
// syntax: func.bind(obj, arg1, arg2, arg3, ...) returns a functions

greet.call(person, "Tesla", "Harley"); // called on the same line where it is declared
greet.apply(person, ["Tesla", "Harley"]);

var newGreet = greet.bind(person, "Tesla", "Harley"); // returns a function

document.getElementById("btn").addEventListener("click", newGreet);
// function borrowing

var employee = {
  fname: "Ashish",
  greet: function () {
    console.log(`Hello, ${this.fname}`);
  },
};

var customer = {
  fname: "Mark",
};

var customer2 = {
  fname: "Suman",
};

employee.greet();
// obj_which_has_func.func.call(obj_to_bind)

employee.greet.call(customer);
employee.greet.call(customer2);

// new binding or constructor binding
function Foo() {
  // 1. create a new object  referenced by `this` variable
  // var this = {};
  // 2. properties and methods are added to `this`
  // this = {
  //   fname: "John",
  //   sayHello: function () {}
  //}
  this.fname = "John";
  this.sayHello = function () {
    console.log(`Hello, ${this.fname}`);
  };
  // 3. return `this`
}

var newfoo = new Foo();
// newfoo = {
//   fname: "suman ghosh",
//   sayHello: function () {}
//}
newfoo.fname = "suman ghosh";
console.log(newfoo.fname);

newfoo.sayHello();

// priority: new binding > explicit binding > implicit binding > default binding
var bunny = {
  fname: "usagi",
  tasks: ["eat", "sleep", "play"],
  showName: function () {
    console.log(this.fname); // bunny.fname
  },
  showTasks: function () {
    // this => bunny
    // this.tasks => bunny.tasks
    // this.fname => bunny.fname
    this.tasks.forEach((task) => {
      // this => window
      console.log(`${this.fname} wants to ${task}`);
    });
  },
};

bunny.showTasks();

// func.bind(obj)

// Arrow functions and this keyword:
// Arrow functions do not have their own this value. The value of this inside
// an arrow function is always inherited from the enclosing scope/outer scope/lexical scope

// difference between arrow and normal function
// the way they handle the this keyword
// new constructor binding is not possible with arrow functions
// arrow function don't have access to arguments object

const foo = (...args) => {
  console.log(args);
};

function bar() {
  console.log(arguments);
}
bar(1, 2, 3, 4, 5);

foo(1, 2, 3, 4, 5);

// default binding
// arrow functions work similar to normal functions
const sayHi = () => {
  console.log(this);
};

sayHi();

// implicit binding

var group = {
  title: "Our group",
  students: ["John", "Pete", "Alice"],
  showGroupTitle: () => {
    // this => outer scope => window
    console.log(`Group title is : ${this.title}`);
  },
  showList: function () {
    // this => group
    this.students.forEach((student) => {
      // this => group
      console.log(this.title, ": ", student);
    });
  },
};

group.showGroupTitle(); // undefined
group.showList();

// explicit binding

var person = {
  fname: "aman",
};

var greet = (car, bike) => {
  console.log(`Hello, ${this.fname} I have ${car} and ${bike}`);
};

greet.call(person, "creta", "splendor"); // this => window

// new binding
// new binding is not possible with arrow functions

var arr = [1, 2, 3, 4, 5];

// proto : property is present in all js objects,
// it points to the prototype object of the  parent object from whic child object is created
// allows the inheritance mechanism and helps in finding properties and methods
// which are not directly present in that custom object, but present in the parent object

// prototype:
// only exists in constructor functions or class
// it defines shared properties and methods for all objects created using the constructor function or class

const fn = () => {};
const str = "abc";
const num = 123;
const bool = true;

// in correct way
// arr.__proto__.fname = "suman ghosh";

Array.prototype.concat = function () {
  console.log("Hello, from greet");
};

arr.concat();
