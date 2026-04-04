// object orinted programming in javascript

// creating a class
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // method to display person's information
    displayInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}

// creating an instance of the Person class
const person1 = new Person('Alice', 30);
const person2 = new Person('Bob', 25);

// calling the method to display information
person1.displayInfo(); // Output: Name: Alice, Age: 30
person2.displayInfo(); // Output: Name: Bob, Age: 25

// constructor example
class Car {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    // method to display car's information
    displayCarInfo() {
        console.log(`Make: ${this.make}, Model: ${this.model}, Year: ${this.year}`);
    }
}

// creating an instance of the Car class
const car1 = new Car('Toyota', 'Camry', 2020);
car1.displayCarInfo(); // Output: Make: Toyota, Model: Camry, Year: 2020    


// inheritance example
class Employee extends Person {
    constructor(name, age, jobTitle) {
        super(name, age); // call the parent class constructor
        this.jobTitle = jobTitle;
    }

    // method to display employee's information
    displayEmployeeInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Job Title: ${this.jobTitle}`);
    }
}

// creating an instance of the Employee class
const employee1 = new Employee('Charlie', 28, 'Software Engineer');
employee1.displayEmployeeInfo(); // Output: Name: Charlie, Age: 28, Job Title: Software Engineer

// encapsulation example
class BankAccount {
    constructor(owner, balance) {
        this.owner = owner;
        this._balance = balance; // private property
    }

    // method to deposit money
    deposit(amount) {
        if (amount > 0) {
            this._balance += amount;
            console.log(`Deposited: $${amount}. New Balance: $${this._balance}`);
        } else {
            console.log('Deposit amount must be positive.');
        }
    }

    // method to withdraw money
    withdraw(amount) {
        if (amount > 0 && amount <= this._balance) {
            this._balance -= amount;
            console.log(`Withdrew: $${amount}. New Balance: $${this._balance}`);
        } else {
            console.log('Invalid withdrawal amount.');
        }
    }

    // method to get the current balance
    getBalance() {
        return this._balance;
    }
}

// creating an instance of the BankAccount class
const account1 = new BankAccount('Dave', 1000);
account1.deposit(500); // Output: Deposited: $500. New Balance: $1500
account1.withdraw(200); // Output: Withdrew: $200. New Balance: $1300
console.log(`Current Balance: $${account1.getBalance()}`); // Output: Current Balance: $1300    

// polymorphism example
class Shape {
    area() {
        return 0;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

console.log(`Circle Area: ${circle.area()}`); // Output: Circle Area: 78.53981633974483
console.log(`Rectangle Area: ${rectangle.area()}`); // Output: Rectangle Area: 24       

// Abstract class example
class Animal {
    constructor(name) {
        this.name = name;
    }

    makeSound() {
        throw new Error('Method "makeSound()" must be implemented.');
    }
}

class Dog extends Animal {
    makeSound() {
        return 'Woof!';
    }
}

class Cat extends Animal {
    makeSound() {
        return 'Meow!';
    }
}

const dog = new Dog('Buddy');
const cat = new Cat('Whiskers');

console.log(`${dog.name} says: ${dog.makeSound()}`); // Output: Buddy says: Woof!
console.log(`${cat.name} says: ${cat.makeSound()}`); // Output: Whiskers says: Meow!    

// Encapsulation with private fields (ES2022)
class User {
    #password; // private field

    constructor(username, password) {
        this.username = username;
        this.#password = password; // set the private field
    }
    
    // method to check the password
    checkPassword(password) {
        return this.#password === password;
    }
}

const user1 = new User('Alice', ' secret123');
console.log(user1.checkPassword('secret123')); // Output: true
console.log(user1.checkPassword('wrongpassword')); // Output: false     

// Static method example
class MathUtils {
    static add(a, b) {
        return a + b;
    }

    static subtract(a, b) {
        return a - b;
    }
}

console.log(MathUtils.add(5, 3)); // Output: 8
console.log(MathUtils.subtract(5, 3)); // Output: 2 

// Method chaining example
class Calculator {
    constructor(value = 0) {
        this.value = value;
    }

    add(num) {
        this.value += num;
        return this; // return the instance for chaining
    }

    subtract(num) {
        this.value -= num;
        return this; // return the instance for chaining
    }

    multiply(num) {
        this.value *= num;
        return this; // return the instance for chaining
    }

    divide(num) {
        if (num !== 0) {
            this.value /= num;
        } else {
            console.log('Cannot divide by zero.');
        }
        return this; // return the instance for chaining
    }

    getResult() {
        return this.value;
    }
}

const calc = new Calculator();
const result = calc.add(5).subtract(2).multiply(3).divide(2).getResult();
console.log(`Result: ${result}`); // Output: Result: 4.5

// Polymorphism with method overriding
class Vehicle {
    start() {
        console.log('Vehicle is starting...');
    }
}

class Car extends Vehicle {
    start() {
        console.log('Car is starting with a key...');
    }
}

class Motorcycle extends Vehicle {
    start() {
        console.log('Motorcycle is starting with a button...');
    }
}

const car = new Car();
const motorcycle = new Motorcycle();
car.start(); // Output: Car is starting with a key...
motorcycle.start(); // Output: Motorcycle is starting with a button...

// Polymorphism with method overloading (not natively supported in JavaScript, but can be simulated)
class Logger {
    log(message) {
        console.log(`Log: ${message}`);
    }

    log(message, level) {
        console.log(`[${level}] Log: ${message}`);
    }
}

const logger = new Logger();
logger.log('This is a log message.'); // Output: [undefined] Log: This is a log message.
logger.log('This is an error message.', 'ERROR'); // Output: [ERROR] Log: This is an error message. 

