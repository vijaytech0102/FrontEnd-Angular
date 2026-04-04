/**
 * ===================================================================
 * JAVASCRIPT FUNCTIONS - COMPREHENSIVE INDUSTRIAL-LEVEL GUIDE
 * ===================================================================
 * 
 * Functions are one of the fundamental building blocks in JavaScript.
 * They allow you to encapsulate reusable logic, manage scope, and
 * implement complex programming patterns. This guide covers all
 * function types and best practices used in production systems.
 * 
 * Topics Covered:
 * 1. Function Declarations
 * 2. Function Expressions
 * 3. Arrow Functions
 * 4. Function Constructors
 * 5. IIFE (Immediately Invoked Function Expressions)
 * 6. Closures & Scope
 * 7. Higher-Order Functions
 * 8. Callback Functions
 * 9. Async Functions & Promises
 * 10. Pure Functions & Functional Programming
 * ===================================================================
 */

// ============================================================
// 1. FUNCTION DECLARATIONS
// ============================================================

/**
 * Function Declaration: A regular function defined with the 'function' keyword.
 * 
 * Characteristics:
 * - Hoisted to the top of their scope (can be called before declaration)
 * - Creates an entry in the global/local scope
 * - Default return value is 'undefined'
 * - Best used for main program logic and named operations
 */

function add(a, b) {
  // Simple return statement
  return a + b;
}

console.log(add(5, 3)); // Output: 8

/**
 * Function with Default Parameters (ES6+)
 * Default parameters provide fallback values if arguments aren't provided
 */

function greet(name = 'Guest', surname = 'User') {
  return `Hello, ${name} ${surname}!`;
}

console.log(greet()); // Output: Hello, Guest User!
console.log(greet('John', 'Doe')); // Output: Hello, John Doe!

/**
 * Function with Rest Parameters (...)
 * Allows a function to accept unlimited arguments as an array
 * This is more flexible than the deprecated 'arguments' object
 */

function calculateSum(...numbers) {
  // Rest parameter captures all arguments into an array
  return numbers.reduce((sum, num) => sum + num, 0);
}

console.log(calculateSum(1, 2, 3, 4, 5)); // Output: 15
console.log(calculateSum(10, 20)); // Output: 30

/**
 * Function with Destructuring Parameters
 * ES6 destructuring in function parameters for cleaner code
 */

function displayUser({ name, age, email }) {
  // Automatically extracts properties from object parameter
  console.log(`User: ${name}, Age: ${age}, Email: ${email}`);
}

const user = { name: 'Alice', age: 30, email: 'alice@example.com' };
displayUser(user);

/**
 * Function with Array Destructuring
 */

function getCoordinates([x, y]) {
  return { latitude: x, longitude: y };
}

console.log(getCoordinates([40.7128, 74.0060])); // NYC coordinates

// ============================================================
// 2. FUNCTION EXPRESSIONS
// ============================================================

/**
 * Anonymous Function Expression:
 * A function assigned to a variable. Unlike declarations, these are NOT hoisted.
 * 
 * Use Case: When you need a function as a value, callback, or wrapped in logic.
 */

const multiply = function(a, b) {
  return a * b;
};

console.log(multiply(4, 5)); // Output: 20

/**
 * Named Function Expression:
 * A function expression with a name. The name is only accessible inside the function.
 * This is useful for recursion and better stack traces during debugging.
 */

const factorial = function calculateFactorial(n) {
  // 'calculateFactorial' is only accessible inside this function
  if (n <= 1) return 1;
  return n * calculateFactorial(n - 1); // Recursion using function name
};

console.log(factorial(5)); // Output: 120

/**
 * Conditional Function Assignment:
 * Functions can be assigned conditionally based on runtime conditions.
 * This pattern is useful for polyfills and feature detection.
 */

const getTimestamp = typeof performance !== 'undefined' && performance.now
  ? () => performance.now() // High-resolution timer if available
  : () => Date.now();        // Fallback to Date.now()

console.log(getTimestamp());

// ============================================================
// 3. ARROW FUNCTIONS (ES6)
// ============================================================

/**
 * Arrow Function Basics:
 * Concise syntax introduced in ES6. More than just syntactic sugar!
 * 
 * Key Differences from regular functions:
 * - No 'this' binding (inherits from enclosing scope)
 * - Cannot be used as constructors
 * - No 'arguments' object (use rest parameters instead)
 * - Implicit return for single expressions
 */

// Single parameter, implicit return
const square = (x)=> x * x;
console.log(square(5)); // Output: 25

// Multiple parameters
const divide = (a, b) => a / b;
console.log(divide(20, 4)); // Output: 5

// Multiple statements, explicit return
const complexCalculation = (a, b) => {
  const sum = a + b;
  const product = a * b;
  return sum + product;
};

console.log(complexCalculation(3, 4)); // Output: 19

// Returning an object literal (requires parentheses)
const createUser = (name, age) => ({ name, age, id: Math.random() });
console.log(createUser('Bob', 25));

/**
 * Arrow Functions and 'this' Binding:
 * Arrow functions lexically bind 'this' from the enclosing context.
 * This prevents the common issue of losing 'this' context in callbacks.
 */

const person = {
  name: 'John',
  age: 30,
  
  // Regular function: 'this' is the person object
  introduce: function() {
    console.log(`I am ${this.name}`);
  },
  
  // Arrow function: 'this' is inherited from surrounding scope
  // This would be problematic if we rely on 'this' being the person object
  greetWithDelay: function() {
    setTimeout(() => {
      // Arrow function preserves 'this' from greetWithDelay method
      console.log(`Hello, I am ${this.name}`);
    }, 1000);
  }
};

person.introduce(); // Output: I am John
person.greetWithDelay(); // Output: Hello, I am John (after 1 second)

/**
 * Common Arrow Function Pattern: Array Methods
 * Arrow functions are ideal for array callbacks due to their concise syntax
 */

const numbers = [1, 2, 3, 4, 44,6545,656];

// Map: Transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]


// Filter: Keep elements matching condition
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// Reduce: Accumulate values
const product = numbers.reduce((acc, n) => acc * n, 1);
console.log(product); // 120

// ============================================================
// 4. FUNCTION CONSTRUCTORS
// ============================================================

/**
 * Function Constructors:
 * Functions can be used with 'new' keyword to create objects.
 * Though classes are preferred in modern JavaScript, understanding
 * constructors is essential for working with legacy code.
 * 
 * Convention: Constructor functions start with uppercase letter
 */

function User(name, email) {
  // 'this' refers to the newly created object
  this.name = name;
  this.email = email;
  
  // Methods can be defined on the instance (not recommended - memory inefficient)
  this.getInfo = function() {
    return `${this.name} (${this.email})`;
  };
}

const user1 = new User('Alice', 'alice@example.com');
console.log(user1.getInfo()); // Output: Alice (alice@example.com)
console.log(user1 instanceof User); // Output: true

/**
 * Prototype Pattern: More Memory Efficient
 * Methods defined on prototype are shared across all instances
 * This is the foundation of JavaScript's prototypal inheritance
 */

function Product(name, price) {
  this.name = name;
  this.price = price;
}

// Methods on prototype are shared by all instances
Product.prototype.getPrice = function() {
  return `$${this.price.toFixed(2)}`;
};

Product.prototype.applyDiscount = function(discountPercent) {
  return this.price * (1 - discountPercent / 100);
};

const product1 = new Product('Laptop', 999.99);
const product2 = new Product('Mouse', 29.99);

console.log(product1.getPrice()); // Output: $999.99
console.log(product2.applyDiscount(10)); // Output: 26.991

/**
 * Constructor Property:
 * Each instance has a 'constructor' property referencing its constructor function
 */

console.log(user1.constructor === User); // Output: true
console.log(user1.constructor.name); // Output: User

// ============================================================
// 5. IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE)
// ============================================================

/**
 * IIFE Pattern:
 * A function defined and immediately executed in one expression.
 * 
 * Benefits:
 * - Creates a new scope, avoiding global namespace pollution
 * - Isolates variables from the global scope
 * - Executes initialization code immediately
 * - Prevents variable conflicts
 */

// Classic IIFE with parentheses
(function() {
  const privateVariable = 'This is private';
  console.log(privateVariable); // Accessible only inside this function
})();

// console.log(privateVariable); // ReferenceError: privateVariable is not defined

/**
 * IIFE with Parameters:
 * Passed arguments become local variables, isolating them from global scope
 */

(function(name, age) {
  const message = `${name} is ${age} years old`;
  console.log(message);
})('Charlie', 28); // Output: Charlie is 28 years old

/**
 * IIFE Returning Values:
 * Can return a value and assign it to a variable
 */

const result = (function() {
  const a = 10;
  const b = 20;
  return a + b;
})();

console.log(result); // Output: 30

/**
 * IIFE with Arrow Functions (Modern Approach):
 * More concise syntax using arrow functions
 */

(() => {
  console.log('Executed immediately using arrow function');
})();

/**
 * IIFE Module Pattern:
 * A powerful pattern for creating modules with private and public interfaces
 */

const Calculator = (function() {
  // Private variables
  const history = [];
  
  // Private function
  function logOperation(operation, result) {
    history.push({ operation, result, timestamp: Date.now() });
  }
  
  // Public interface (returned object)
  return {
    add: function(a, b) {
      const result = a + b;
      logOperation('add', result);
      return result;
    },
    
    multiply: function(a, b) {
      const result = a * b;
      logOperation('multiply', result);
      return result;
    },
    
    getHistory: function() {
      return [...history]; // Return copy to prevent modification
    }
  };
})();

console.log(Calculator.add(5, 3)); // Output: 8
console.log(Calculator.multiply(4, 5)); // Output: 20
console.log(Calculator.getHistory()); // Shows operation history

// Calculator.history is undefined - private variable is protected

// ============================================================
// 6. CLOSURES & SCOPE
// ============================================================

/**
 * Closures:
 * A function has access to variables from its enclosing scope,
 * even after that scope has finished executing.
 * 
 * This is one of the most important concepts in JavaScript!
 * Closures are created every time a function is created.
 */

/**
 * Simple Closure Example:
 * Inner function "remembers" variables from outer function
 */

function createCounter() {
  let count = 0; // Private variable
  
  return function increment() {
    // This function has access to 'count' even after createCounter returns
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // Output: 1
console.log(counter()); // Output: 2
console.log(counter()); // Output: 3

// Each call to createCounter creates a new closure with its own 'count'
const counter2 = createCounter();
console.log(counter2()); // Output: 1 (new closure)

/**
 * Closure with Multiple Return Values:
 * Create multiple functions sharing the same private state
 */

function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    
    withdraw: function(amount) {
      if (amount > balance) {
        throw new Error('Insufficient funds');
      }
      balance -= amount;
      return balance;
    },
    
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
console.log(account.deposit(500)); // Output: 1500
console.log(account.withdraw(200)); // Output: 1300
console.log(account.getBalance()); // Output: 1300

/**
 * Closure in Loops - Common Pitfall:
 * Variables in loops can create unexpected closure behavior
 */

// Problem: All functions reference the same 'i'
const functions = [];
for (var i = 0; i < 3; i++) {
  functions.push(function() {
    return i; // All return 3 (the final value of i)
  });
}

console.log(functions[0]()); // Output: 3 (not 0!)
console.log(functions[1]()); // Output: 3 (not 1!)
console.log(functions[2]()); // Output: 3

// Solution 1: Use let instead of var (creates block scope)
const correctFunctions = [];
for (let j = 0; j < 3; j++) {
  correctFunctions.push(function() {
    return j; // Each iteration creates new variable j
  });
}

console.log(correctFunctions[0]()); // Output: 0
console.log(correctFunctions[1]()); // Output: 1
console.log(correctFunctions[2]()); // Output: 2

// Solution 2: Use IIFE to create new scope
const iifeFunctions = [];
for (var k = 0; k < 3; k++) {
  iifeFunctions.push((function(index) {
    return function() {
      return index;
    };
  })(k));
}

console.log(iifeFunctions[0]()); // Output: 0
console.log(iifeFunctions[1]()); // Output: 1
console.log(iifeFunctions[2]()); // Output: 2

/**
 * Lexical Scope:
 * Functions have access to variables in their lexical (textual) environment,
 * not where they are called from.
 */

const globalVar = 'global';

function outer() {
  const outerVar = 'outer';
  
  function inner() {
    const innerVar = 'inner';
    console.log(innerVar); // Access to inner scope
    console.log(outerVar); // Access to outer scope (closure)
    console.log(globalVar); // Access to global scope
  }
  
  return inner;
}

const innerFunc = outer();
innerFunc(); // Can access all variables in its lexical scope

// ============================================================
// 7. HIGHER-ORDER FUNCTIONS
// ============================================================

/**
 * Higher-Order Functions:
 * Functions that take other functions as arguments or return functions.
 * 
 * This enables powerful functional programming patterns in JavaScript.
 * Essential for callbacks, event handlers, decorators, etc.
 */

/**
 * Function as Parameter:
 * Pass a function to another function
 */

function processArray(array, callback) {
  /* 
   * 'callback' is a higher-order function parameter.
   * The caller decides what operation to perform on each element.
   */
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i]));
  }
  return result;
}

const nums = [1, 2, 3, 4, 5];

// Pass different functions for different operations
const squared = processArray(nums, x => x * x);
const tripled = processArray(nums, x => x * 3);
const stringified = processArray(nums, x => `Number: ${x}`);

console.log(squared); // [1, 4, 9, 16, 25]
console.log(tripled); // [3, 6, 9, 12, 15]
console.log(stringified); // ["Number: 1", "Number: 2", ...]

/**
 * Function Returning a Function (Currying):
 * Useful for partial application and creating specialized functions
 */

function createMultiplier(factor) {
  // Returns a new function that "remembers" the factor
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log(double(5)); // Output: 10
console.log(triple(5)); // Output: 15
console.log(quadruple(5)); // Output: 20

/**
 * Function Composition:
 * Combining multiple functions to create complex operations
 */

// Utility function to compose functions (right to left execution)
function compose(...functions) {
  return function(initialValue) {
    // Execute functions from right to left
    return functions.reduceRight((value, fn) => fn(value), initialValue);
  };
}

// Define simple, reusable functions
const add2 = x => x + 2;
const multiply3 = x => x * 3;
const subtract5 = x => x - 5;

// Compose them: ((x - 5) * 3) + 2
const complexOperation = compose(add2, multiply3, subtract5);
console.log(complexOperation(10)); // (10 - 5) * 3 + 2 = 17

/**
 * Pipe Function:
 * Like compose but executes left to right (more intuitive)
 */

function pipe(...functions) {
  return function(initialValue) {
    return functions.reduce((value, fn) => fn(value), initialValue);
  };
}

// Pipe: (10 * 3) - 5 + 2 = 24
const pipeOperation = pipe(multiply3, subtract5, add2);
console.log(pipeOperation(10)); // 24

/**
 * Array.map, Array.filter, Array.reduce - All Higher-Order Functions
 */

const data = [1, 2, 3, 4, 5];

// map: passes each element to callback function
const mapped = data.map(x => x ** 2);
console.log(mapped); // [1, 4, 9, 16, 25]

// filter: passes each element and keeps those where callback returns true
const filtered = data.filter(x => x > 2);
console.log(filtered); // [3, 4, 5]

// reduce: passes accumulator and current element
const sum = data.reduce((acc, x) => acc + x, 0);
console.log(sum); // 15

// ============================================================
// 8. CALLBACK FUNCTIONS
// ============================================================

/**
 * Callback Functions:
 * A function passed to another function, to be executed later.
 * Fundamental pattern in JavaScript for handling asynchronous operations.
 * 
 * If overused (callback hell), they can make code hard to read.
 * This is why Promises and async/await were introduced.
 */

/**
 * Synchronous Callback:
 * Executed immediately, useful for array methods
 */

function findMax(array, callback) {
  let max = array[0];
  for (let num of array) {
    if (num > max) max = num;
  }
  // Invoke callback when operation is complete
  callback(max);
}

findMax([1, 5, 3, 9, 2], function(result) {
  console.log(`Maximum value is: ${result}`); // Output: Maximum value is: 9
});

/**
 * Asynchronous Callback:
 * Executed after some operation (I/O, timeout, event)
 */

function fetchUserData(userId, onSuccess, onError) {
  // Simulate API call with setTimeout
  setTimeout(() => {
    if (userId > 0) {
      const user = { id: userId, name: 'John Doe', email: 'john@example.com' };
      onSuccess(user); // Invoke success callback
    } else {
      onError('Invalid user ID'); // Invoke error callback
    }
  }, 1000);
}

fetchUserData(
  1,
  function(user) {
    console.log('User fetched:', user);
  },
  function(error) {
    console.log('Error:', error);
  }
);

/**
 * Callback Hell (Also called "Pyramid of Doom"):
 * Multiple nested callbacks become hard to read and maintain.
 * This is one reason Promises were introduced.
 */

// Avoid this pattern!
function getUser(id, callback) {
  setTimeout(() => {
    callback({ id, name: 'User ' + id });
  }, 500);
}

function getPosts(userId, callback) {
  setTimeout(() => {
    callback([{ id: 1, title: 'Post 1' }]);
  }, 500);
}

// Callback Hell Example (Don't do this!)
/*
getUser(1, function(user) {
  getPosts(user.id, function(posts) {
    processComments(posts[0].id, function(comments) {
      displayResults(user, posts, comments);
    });
  });
});
*/

/**
 * Common Callback Patterns in Real Code:
 * Event listeners, timers, file I/O
 */

// Event listener with callback
document.addEventListener('click', function(event) {
  console.log('Document clicked:', event);
  // Callback called when click event occurs
});

// setTimeout callback
setTimeout(() => {
  console.log('This runs after 2 seconds');
}, 2000);

// ============================================================
// 9. ASYNC FUNCTIONS & PROMISES
// ============================================================

/**
 * Promises:
 * A modern alternative to callbacks for handling asynchronous operations.
 * Represent a value that may not be available yet but will be resolved.
 * 
 * States:
 * - Pending: Operation in progress
 * - Fulfilled: Operation completed successfully (value resolved)
 * - Rejected: Operation failed (error rejected)
 */

/**
 * Creating and Using Promises
 */

function fetchData(url) {
  // Return a new Promise
  return new Promise((resolve, reject) => {
    // Simulate async operation
    setTimeout(() => {
      if (url) {
        resolve({ data: 'Response from ' + url });
      } else {
        reject(new Error('URL is required'));
      }
    }, 1000);
  });
}

// Consuming promise with .then() and .catch()
fetchData('https://api.example.com/data')
  .then((response) => {
    console.log('Success:', response);
    return response.data; // Can chain promises
  })
  .catch((error) => {
    console.log('Error:', error.message);
  })
  .finally(() => {
    console.log('Operation completed'); // Runs regardless of outcome
  });

/**
 * Promise Chaining:
 * Chain multiple async operations in order
 */

function getUser(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: 'John', companyId: 5 });
    }, 500);
  });
}

function getCompany(companyId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: companyId, name: 'Acme Corp' });
    }, 500);
  });
}

// Chain promises
getUser(1)
  .then(user => {
    console.log('User:', user);
    return getCompany(user.companyId); // Return another promise
  })
  .then(company => {
    console.log('Company:', company);
  })
  .catch(error => {
    console.log('Error in chain:', error);
  });

/**
 * Async/Await:
 * Modern syntax that makes async code look like synchronous code.
 * Built on top of Promises. Much more readable than callback hell!
 * 
 * 'async' keyword: Makes a function return a Promise
 * 'await' keyword: Pauses execution until Promise resolves (only in async functions)
 */

// Define async function
async function getUserAndCompany(userId) {
  try {
    // Wait for promise to resolve
    const user = await getUser(userId);
    console.log('User:', user);
    
    // Use the result from previous await
    const company = await getCompany(user.companyId);
    console.log('Company:', company);
    
    return { user, company }; // Return value wrapped in Promise
  } catch (error) {
    // Handle any error from async operations
    console.log('Error:', error.message);
    throw error; // Re-throw if needed
  }
}

// Call async function (returns a Promise)
getUserAndCompany(1)
  .then(result => {
    console.log('Final result:', result);
  })
  .catch(error => {
    console.log('Caught error:', error);
  });

/**
 * Promise.all():
 * Execute multiple Promises in parallel, wait for all to complete
 */

async function fetchMultipleUsers() {
  try {
    // Run all promises simultaneously
    const [user1, user2, user3] = await Promise.all([
      getUser(1),
      getUser(2),
      getUser(3)
    ]);
    
    console.log('All users:', user1, user2, user3);
  } catch (error) {
    console.log('One of the promises failed:', error);
  }
}

/**
 * Promise.race():
 * Execute multiple Promises, return result of first to complete
 */

async function raceExample() {
  const result = await Promise.race([
    new Promise(resolve => setTimeout(() => resolve('First'), 100)),
    new Promise(resolve => setTimeout(() => resolve('Second'), 200)),
    new Promise(resolve => setTimeout(() => resolve('Third'), 300))
  ]);
  
  console.log('Race winner:', result); // Output: First
}

/**
 * Promise.allSettled():
 * Execute multiple Promises, wait for all to settle (resolve or reject)
 */

async function allSettledExample() {
  const results = await Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another success')
  ]);
  
  console.log('Results:', results);
  /* Output: [
    { status: 'fulfilled', value: 'Success' },
    { status: 'rejected', reason: 'Error' },
    { status: 'fulfilled', value: 'Another success' }
  ] */
}

// ============================================================
// 10. PURE FUNCTIONS & FUNCTIONAL PROGRAMMING
// ============================================================

/**
 * Pure Functions:
 * A function is pure if:
 * 1. For the same inputs, it always returns the same output
 * 2. It has no side effects (doesn't modify external state)
 * 
 * Benefits: Testable, predictable, cacheable, parallel-safe
 */

/**
 * Pure Function Example:
 * No side effects, deterministic output
 */

function add(a, b) {
  return a + b;
}

// add(2, 3) always returns 5
// It doesn't modify any external variables or state

/**
 * Impure Function Example:
 * Has side effects (modifies external state)
 */

let total = 0; // External state

function addToTotal(amount) {
  total += amount; // Side effect: modifies external variable
  return total;
}

console.log(addToTotal(5)); // 5
console.log(addToTotal(5)); // 10 - Same input, different output!

/**
 * Making Functions Pure:
 * Avoid modifying external state, pass all dependencies as parameters
 */

function pureLikeAdd(a, b, currentTotal) {
  // Pure: doesn't modify external state
  return currentTotal + a + b;
}

let myTotal = 0;
myTotal = pureLikeAdd(5, 3, myTotal); // 8
myTotal = pureLikeAdd(5, 3, myTotal); // 16 (different because we pass new total)

/**
 * Immutability in Pure Functions:
 * Don't modify objects/arrays passed as parameters
 */

// Impure: modifies the input array
function impureAddElement(array, element) {
  array.push(element); // Side effect!
  return array;
}

// Pure: returns new array without modifying input
function pureAddElement(array, element) {
  return [...array, element]; // Spread operator creates new array
}

const original = [1, 2, 3];
const updated = pureAddElement(original, 4);

console.log(original); // [1, 2, 3] - unchanged
console.log(updated); // [1, 2, 3, 4] - new array

/**
 * Functional Programming Patterns:
 * Combining pure functions for powerful results
 */

// Pure utility functions
const isEven = n => n % 2 === 0;
const double = n => n * 2;
const sum = (a, b) => a + b;

// Compose functions
const getEvenDoublesSum = (arr) => {
  return arr
    .filter(isEven) // Keep only even numbers
    .map(double)     // Double each number
    .reduce(sum);    // Sum all numbers
};

console.log(getEvenDoublesSum([1, 2, 3, 4, 5, 6])); // 24 (2*2 + 4*2 + 6*2)

/**
 * Memoization:
 * Cache results of expensive pure functions
 */

function memoize(fn) {
  // Create cache object in closure
  const cache = {};
  
  return function(...args) {
    // Create cache key from arguments
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log('Returning cached result for:', args);
      return cache[key];
    }
    
    console.log('Computing result for:', args);
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Expensive function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoized version - much faster for repeated calls
const memoizedFib = memoize(fibonacci);

console.log(memoizedFib(5)); // Computing result for: [5]
console.log(memoizedFib(5)); // Returning cached result for: [5]

// ============================================================
// ADVANCED PATTERNS AND BEST PRACTICES
// ============================================================

/**
 * Partial Application:
 * Create new function by pre-filling some arguments
 */

function multiply(a, b, c) {
  return a * b * c;
}

function partial(fn, ...boundArgs) {
  return function(...args) {
    return fn(...boundArgs, ...args);
  };
}

const multiplyByTwo = partial(multiply, 2);
const multiplyByTwoAndThree = partial(multiplyByTwo, 3);

console.log(multiplyByTwoAndThree(5)); // 2 * 3 * 5 = 30

/**
 * Decorator Pattern:
 * Wrap a function to add behavior without modifying original
 */

function withLogging(fn) {
  return function(...args) {
    console.log(`Calling ${fn.name} with args:`, args);
    const result = fn(...args);
    console.log(`${fn.name} returned:`, result);
    return result;
  };
}

const addWithLogging = withLogging(add);
addWithLogging(5, 3); // Logs function call details

/**
 * Throttling:
 * Limit function execution frequency
 */

function throttle(fn, delay) {
  let lastCall = 0;
  
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return fn(...args);
    }
  };
}

// Example: limit search API calls during user typing
const throttledSearch = throttle((query) => {
  console.log('Searching for:', query);
}, 300); // Maximum once every 300ms

/**
 * Debouncing:
 * Delay function execution until activity stops
 */

function debounce(fn, delay) {
  let timeoutId;
  
  return function(...args) {
    // Clear previous timeout if user calls function again
    clearTimeout(timeoutId);
    
    // Set new timeout
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// Example: search after user stops typing (waits 300ms of inactivity)
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

// ============================================================
// SUMMARY & BEST PRACTICES
// ============================================================

/**
 * Key Takeaways:
 * 
 * 1. FUNCTION DECLARATIONS
 *    - Use for main operations, they're hoisted
 *    - Support default parameters and rest parameters
 * 
 * 2. FUNCTION EXPRESSIONS
 *    - Use for callbacks and values, not hoisted
 *    - Named expressions help with recursion and debugging
 * 
 * 3. ARROW FUNCTIONS
 *    - Modern syntax, lexically binds 'this'
 *    - Perfect for callbacks and array methods
 * 
 * 4. CLOSURES
 *    - Functions remember their lexical environment
 *    - Fundamental for creating private state
 * 
 * 5. HIGHER-ORDER FUNCTIONS
 *    - Functions that operate on other functions
 *    - Enable functional programming patterns
 * 
 * 6. ASYNC/PROMISES/ASYNC-AWAIT
 *    - Essential for modern asynchronous JavaScript
 *    - Async-await preferred for readability
 * 
 * 7. PURE FUNCTIONS
 *    - Same input, same output, no side effects
 *    - Easier to test, debug, and reason about
 * 
 * Best Practices:
 * - Use const/let, avoid var
 * - Prefer const for functions unless reassignment needed
 * - Use arrow functions for callbacks
 * - Avoid callback hell - use Promises/async-await
 * - Write pure functions when possible
 * - Document function behavior with JSDoc comments
 * - Handle errors appropriately in async code
 * - Test functions in isolation
 */

// ============================================================
// END OF COMPREHENSIVE FUNCTION GUIDE
// ============================================================
