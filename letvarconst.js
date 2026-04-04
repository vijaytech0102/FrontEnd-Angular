// let var const explained

// var is function scoped, let and const are block scoped
// var can be redeclared and updated, let can be updated but not redeclared, const cannot be updated or redeclared

// var example
var x = 10;
console.log(x); // 10
var x = 20;
console.log(x); // 20

// let example
// let is block scoped, so it cannot be redeclared in the same scope
let y = 10;
console.log(y); // 10
y = 20;
console.log(y); // 20
// let y = 30; // SyntaxError: Identifier 'y' has already been declared

// const example
// const is block scoped and cannot be updated or redeclared
// const z = 10; // This line is moved down to avoid redeclaration error
const z = 10;
console.log(z); // 10
// z = 20; // TypeError: Assignment to constant variable.
// const z = 30; // SyntaxError: Identifier 'z' has already been declared

// const with objects and arrays
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]

const obj = { name: "Alice" };
obj.name = "Bob";
console.log(obj); // { name: "Bob" }   