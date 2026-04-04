// functions
// function declaration
function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("Alice")); // Output: Hello, Alice!

// function expression
const greet2 = function(name) {
    return "Hi, " + name + "!";
};
console.log(greet2("Bob")); // Output: Hi, Bob!

// arrow function
const greet3 = (name,lastname) => {
    return "Hey, " + name + " " + lastname + "!";
};
console.log(greet3("Charlie","K")); // Output: Hey, Charlie!

// concise arrow function
const greet4 = name => "Welcome, " + name + "!";
console.log(greet4("Dave")); // Output: Welcome, Dave!



