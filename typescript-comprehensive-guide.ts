/**
 * ===================================================================
 * TYPESCRIPT - COMPREHENSIVE INDUSTRIAL-LEVEL GUIDE
 * ===================================================================
 * 
 * TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
 * It adds static type checking, which helps catch errors at compile time
 * rather than at runtime, making code more maintainable and reliable.
 * 
 * This guide covers all essential topics needed for production-level development.
 * 
 * Topics Covered:
 * 1. Basic Types & Type Annotations
 * 2. Type Inference & Type Assertions
 * 3. Interfaces
 * 4. Classes & OOP Concepts
 * 5. Enums
 * 6. Generics
 * 7. Union & Intersection Types
 * 8. Conditional & Mapped Types
 * 9. Type Guards & Type Narrowing
 * 10. Modules & Namespaces
 * 11. Decorators (Experimental)
 * 12. Error Handling with Types
 * 13. Advanced Patterns
 * ===================================================================
 */

// ============================================================
// 1. BASIC TYPES & TYPE ANNOTATIONS
// ============================================================

/**
 * Type Annotations:
 * Explicitly declare the type of variables, function parameters, and return types.
 * This helps TypeScript catch type-related errors at compile time.
 * 
 * Primitive Types:
 * - boolean: true or false
 * - number: integers, floats, NaN, Infinity
 * - string: text values
 * - null: intentional absence of value
 * - undefined: variable not yet assigned
 * - symbol: unique identifiers
 * - bigint: large integers beyond Number.MAX_SAFE_INTEGER
 */

// Boolean type
const isActive: boolean = true;
const isDeleted: boolean = false;

// Number type - supports integers, floats, NaN, Infinity
const age: number = 25;
const height: number = 5.9;
const notANumber: number = NaN;
const infinity: number = Infinity;

// String type - single or double quotes, template literals
const name: string = 'John Doe';
const email: string = "john@example.com";
const greeting: string = `Hello, ${name}!`; // Template literal

// Any type - AVOID in production code! Defeats the purpose of TypeScript
// Use 'any' only as a last resort when you cannot determine the type
let dynamicValue: any; // Don't do this!
dynamicValue = 5;
dynamicValue = 'string';
dynamicValue = true;

/**
 * Array Types:
 * Multiple ways to declare array types in TypeScript
 */

// Using bracket notation
const numbers: number[] = [1, 2, 3, 4, 5];
const strings: string[] = ['apple', 'banana', 'orange'];

// Using generic Array type
const booleans: Array<boolean> = [true, false, true];

// Array of objects
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];

// Arrays with mixed types (Union type - explained later)
const mixed: (string | number)[] = [1, 'two', 3, 'four'];

/**
 * Tuple Type:
 * Fixed-length array with known types at specific positions
 * Very useful for returning multiple values from functions
 */

// Tuple with exactly 2 elements: string and number
const person: [string, number] = ['John', 30];
const city = person[0]; // Type: string
const population = person[1]; // Type: number

// Tuple with labeled elements (more readable)
type Response = [status: number, message: string];
const apiResponse: Response = [200, 'Success'];

// Tuple with optional elements
type FlexibleTuple = [string, number?];
const tuple1: FlexibleTuple = ['hello'];
const tuple2: FlexibleTuple = ['hello', 42];

// Tuple with rest elements
type StringNumberTuple = [string, ...number[]];
const stringNums: StringNumberTuple = ['index', 1, 2, 3, 4, 5];

/**
 * Literal Types:
 * Types that represent specific literal values
 * Useful for restricting values to specific options
 */

// String literal type
type Direction = 'north' | 'south' | 'east' | 'west';
const direction: Direction = 'north';
// const invalid: Direction = 'up'; // Compile error!

// Number literal type
type StatusCode = 200 | 201 | 400 | 404 | 500;
const code: StatusCode = 200;

// Boolean literal type (rarely used)
type TrueOnly = true;
const value: TrueOnly = true;

/**
 * Union Types:
 * A value that can be one of several types
 * Use the pipe (|) operator to combine types
 */

// Function that accepts string OR number
function processInput(value: string | number| boolean): void {
  if (typeof value === 'string') {
    console.log(value.toLowerCase()); // Methods available for string
  } else if (typeof value === 'number') {
    console.log(value.toFixed(2)); // Methods available for number
  } else {
    console.log(value);
  }
}

processInput('hello'); // OK
processInput(42); // OK
// processInput(true); // Compile error!

/**
 * Intersection Types:
 * A value that must be ALL of the specified types
 * Use the ampersand (&) operator
 */

interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

// Type that combines both interfaces
type Person2 = HasName & HasAge;

const employee: Person2 = {
  name: 'John',
  age: 30
};

// ============================================================
// 2. TYPE INFERENCE & TYPE ASSERTIONS
// ============================================================

/**
 * Type Inference:
 * TypeScript automatically determines the type of a variable
 * based on the value assigned to it.
 * Best practice: Let TypeScript infer simple types, but be explicit for complex ones.
 */

// TypeScript infers const greeting: string
const greeting = 'Hello'; 

// TypeScript infers const count: number
const count = 5;

// TypeScript infers const active: boolean
const active = true;

// Function return type inference
function add(a: number, b: number) {
  return a + b; // Return type inferred as number
}

// Array inference
const colors = ['red', 'green', 'blue']; // Type: string[]
const mixed2 = [1, 'two', true]; // Type: (string | number | boolean)[]

/**
 * Type Assertions (Type Casting):
 * Explicitly tell TypeScript what type a value is.
 * Only use when you're absolutely sure about the type.
 * Does NOT perform runtime conversion!
 */

// As syntax (preferred in modern TypeScript)
const inputValue: any = 'hello world';
const strLength: number = (inputValue as string).length;

// Angle bracket syntax (less preferred, conflicts with JSX)
const value: any = 42;
const numValue: number = <number>value;

/**
 * Non-null Assertion Operator (!):
 * Tells TypeScript to treat value as non-null
 * Use sparingly - only when you're certain value is not null
 */

function getValue(): string | null {
  return 'hello';
}

// Without assertion, TypeScript complains about possible null
const value1 = getValue();
const length1 = value1!.length; // ! suppresses null check

// Better approach: use type guard
const value2 = getValue();
if (value2 !== null) {
  const length2 = value2.length; // No assertion needed
}

// ============================================================
// 3. INTERFACES
// ============================================================

/**
 * Interfaces:
 * Define the shape and structure of objects.
 * Used for contract specification - what properties and methods an object must have.
 * Interfaces are compile-time only and don't exist in JavaScript output.
 * 
 * Best Practice: Use interfaces for defining object shapes in your application.
 */

/**
 * Basic Interface Definition
 */

interface User {
  // Required properties
  id: number;
  name: string;
  email: string;
  
  // Optional property (with ?)
  phone?: string;
  
  // Readonly property (cannot be modified after creation)
  readonly createdAt: Date;
}

// Create object matching interface
const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date()
};

// Optional property can be omitted
const user2: User = {
  id: 2,
  name: 'Jane Doe',
  email: 'jane@example.com',
  createdAt: new Date()
  // phone can be omitted since it's optional
};

/**
 * Interface with Methods
 */

interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
}

// Implement interface
const calculator: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b
};

/**
 * Extending Interfaces (Inheritance)
 * Create new interface based on existing one
 */

interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// Extend BaseEntity
interface Product extends BaseEntity {
  name: string;
  price: number;
  stock: number;
}

const product: Product = {
  id: 1,
  name: 'Laptop',
  price: 999.99,
  stock: 10,
  createdAt: new Date(),
  updatedAt: new Date()
};

/**
 * Interface Merging:
 * Multiple interfaces with same name automatically merge
 * Useful for extending built-in types or third-party libraries
 */

interface Settings {
  theme: 'light' | 'dark';
}

interface Settings {
  fontSize: number;
}

// Both properties required
const settings: Settings = {
  theme: 'dark',
  fontSize: 14
};

/**
 * Indexable Interfaces:
 * Define what property types are allowed in an object
 */

// Interface for object with string keys and any value type
interface StringMap {
  [key: string]: string | number | boolean;
}

const config: StringMap = {
  apiUrl: 'https://api.example.com',
  maxRetries: 5,
  useSSL: true
};

/**
 * Function Type Interface:
 * Define the shape of a function
 */

interface SearchFunction {
  (query: string, limit?: number): Promise<any[]>;
}

const search: SearchFunction = async (query, limit = 10) => {
  // Implementation
  return [];
};

// ============================================================
// 4. CLASSES & OOP CONCEPTS
// ============================================================

/**
 * Classes:
 * Blueprints for creating objects with both data (properties) and behavior (methods).
 * TypeScript adds visibility modifiers and type checking to JavaScript classes.
 * 
 * Visibility Modifiers:
 * - public: accessible everywhere (default)
 * - private: accessible only within the class
 * - protected: accessible within class and subclasses
 * - readonly: property cannot be modified after initialization
 */

/**
 * Basic Class Definition
 */

class Employee {
  // Public properties (can be accessed from anywhere)
  public id: number;
  public name: string;
  
  // Private properties (only accessible inside this class)
  private salary: number;
  
  // Protected properties (accessible in this class and subclasses)
  protected department: string;
  
  // Readonly property (cannot be modified)
  readonly email: string;
  
  // Constructor: runs when creating new instance
  constructor(id: number, name: string, salary: number, department: string, email: string) {
    this.id = id;
    this.name = name;
    this.salary = salary;
    this.department = department;
    this.email = email;
  }
  
  // Method
  public getInfo(): string {
    return `${this.name} (${this.department})`;
  }
  
  // Private method (only accessible inside class)
  private calculateBonus(): number {
    return this.salary * 0.1;
  }
  
  // Public method can call private method
  public getSalaryWithBonus(): number {
    return this.salary + this.calculateBonus();
  }
}

const emp = new Employee(1, 'John', 50000, 'Engineering', 'john@company.com');
console.log(emp.getInfo()); // Output: John (Engineering)
// emp.salary = 60000; // Compile error! Private property
// emp.email = 'newemail@company.com'; // Compile error! Readonly property

/**
 * Constructor Parameter Properties (Shorthand):
 * Automatically declare and initialize properties from constructor parameters
 */

class User3 {
  // This syntax declares and initializes properties in one step
  constructor(
    public id: number,              // public id property
    public name: string,
    private password: string,
    public readonly createdAt: Date
  ) {}
  
  // Method
  checkPassword(inputPassword: string): boolean {
    return this.password === inputPassword;
  }
}

const user3 = new User3(1, 'Alice', 'secret123', new Date());
console.log(user3.name); // 'Alice'
// console.log(user3.password); // Compile error! Private property

/**
 * Getters and Setters:
 * Control access to properties with custom logic
 */

class Account {
  private _balance: number = 0;
  
  // Getter: accessed like property, not method
  get balance(): number {
    return this._balance;
  }
  
  // Setter: accessed like property assignment
  set balance(amount: number) {
    if (amount < 0) {
      throw new Error('Balance cannot be negative');
    }
    this._balance = amount;
  }
}

const account = new Account();
account.balance = 1000; // Uses setter
console.log(account.balance); // Uses getter

/**
 * Inheritance:
 * Create specialized classes based on base classes
 */

// Base class
class Animal {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  makeSound(): string {
    return 'Some generic sound';
  }
}

// Subclass inherits from Animal
class Dog extends Animal {
  // Additional property specific to Dog
  breed: string;
  
  constructor(name: string, breed: string) {
    // Must call super() in constructor
    super(name);
    this.breed = breed;
  }
  
  // Override method from parent class
  makeSound(): string {
    return 'Woof! Woof!';
  }
  
  // New method specific to Dog
  fetch(): string {
    return `${this.name} fetches the ball!`;
  }
}

const dog = new Dog('Buddy', 'Golden Retriever');
console.log(dog.makeSound()); // Output: Woof! Woof!
console.log(dog.fetch()); // Output: Buddy fetches the ball!

/**
 * Abstract Classes:
 * Cannot be instantiated directly, must be extended.
 * Use abstract methods to define required implementations in subclasses.
 */

abstract class Shape {
  // Abstract method: subclasses MUST implement
  abstract getArea(): number;
  
  // Concrete method: inherited by subclasses
  describe(): string {
    return `This shape has area: ${this.getArea()}`;
  }
}

// Cannot do: const shape = new Shape(); // Compile error!

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  
  // Must implement abstract method
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

const circle = new Circle(5);
console.log(circle.describe()); // Output: This shape has area: 78.53981633974483

/**
 * Static Members:
 * Belong to the class itself, not instances
 * Accessed using ClassName.staticMember
 */

class MathUtils {
  // Static property
  static readonly PI = 3.14159;
  
  // Static method
  static isEven(num: number): boolean {
    return num % 2 === 0;
  }
  
  static add(a: number, b: number): number {
    return a + b;
  }
}

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.isEven(4)); // true
console.log(MathUtils.add(5, 3)); // 8

// ============================================================
// 5. ENUMS
// ============================================================

/**
 * Enums (Enumeration):
 * A way to define a set of named constants.
 * Useful when a value can only be one of a small set of possibilities.
 * 
 * Types of enums:
 * - Numeric enum: values are numbers
 * - String enum: values are strings
 * - Heterogeneous enum: mix of strings and numbers (not recommended)
 */

/**
 * Numeric Enum:
 * Default, members are numbers starting from 0
 */

enum Direction {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3
}

// Or with auto-increment (same result as above)
enum StatusCode {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  ServerError = 500
}

function handleResponse(code: StatusCode): void {
  switch(code) {
    case StatusCode.Success:
      console.log('Request successful');
      break;
    case StatusCode.NotFound:
      console.log('Resource not found');
      break;
    case StatusCode.ServerError:
      console.log('Server error');
      break;
  }
}

handleResponse(StatusCode.Success); // Output: Request successful

/**
 * String Enum:
 * Members are string values, more readable and easier to debug
 */

enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production'
}

function getApiUrl(env: Environment): string {
  switch(env) {
    case Environment.Development:
      return 'https://dev-api.example.com';
    case Environment.Staging:
      return 'https://staging-api.example.com';
    case Environment.Production:
      return 'https://api.example.com';
  }
}

console.log(getApiUrl(Environment.Production)); // https://api.example.com

/**
 * Enum with String and Number:
 * (Not recommended - harder to maintain)
 */

enum Mixed {
  No = 0,
  Yes = 'YES'
}

/**
 * Const Enum:
 * More efficient - enum values are inlined at compile time
 * cannot access by value (lookup)
 */

const enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE'
}

const selectedColor: Color = Color.Red;
// Color values are inlined in compiled JavaScript, better for performance

/**
 * Reverse Mapping:
 * Numeric enums allow reverse mapping (number -> name)
 */

enum Level {
  Low = 1,
  Medium = 2,
  High = 3
}

const levelName = Level[2]; // 'Medium'
const levelValue = Level.High; // 3

// ============================================================
// 6. GENERICS
// ============================================================

/**
 * Generics:
 * Allow you to write reusable code that works with different types
 * while maintaining type safety.
 * 
 * Think of generics as "type parameters" - similar to function parameters,
 * but for types instead of values.
 * 
 * Benefits:
 * - Code reusability
 * - Type safety
 * - Avoid 'any' types
 * - Flexibility
 */

/**
 * Generic Functions:
 * Accept type parameter(s) and use them in function signature
 */

// Generic function with single type parameter
function getFirst<T>(array: T[]): T {
  return array[0];
}

const firstNum = getFirst<number>([1, 2, 3]); // Type: number
const firstStr = getFirst<string>(['a', 'b', 'c']); // Type: string

// Type inference - don't need to explicitly specify type
const first = getFirst([10, 20, 30]); // TypeScript infers number[]

/**
 * Multiple Type Parameters
 */

function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result1 = pair<string, number>('age', 30); // [string, number]
const result2 = pair(true, 'active'); // [boolean, string] (inferred)

/**
 * Generic Type Parameter with Constraints:
 * Restrict type parameter to certain types
 */

// T must be an object with 'length' property
function getLength<T extends { length: number }>(obj: T): number {
  return obj.length;
}

console.log(getLength('hello')); // 5 - strings have length
console.log(getLength([1, 2, 3])); // 3 - arrays have length
console.log(getLength({ length: 10 })); // 10 - object with length

// getLength(42); // Compile error! number doesn't have length property

/**
 * Generic Constraints with keyof:
 * Access only valid properties of an object
 */

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person4 = { name: 'John', age: 30 };
const name = getProperty(person4, 'name'); // Type: string
// const invalid = getProperty(person4, 'email'); // Compile error! Not a property

/**
 * Generic Interfaces
 */

interface Repository<T> {
  getAll(): T[];
  getById(id: number): T | undefined;
  create(item: T): void;
  update(id: number, item: T): void;
  delete(id: number): void;
}

// Repository for products
interface Product2 {
  id: number;
  name: string;
  price: number;
}

class ProductRepository implements Repository<Product2> {
  private products: Product2[] = [];
  
  getAll(): Product2[] {
    return this.products;
  }
  
  getById(id: number): Product2 | undefined {
    return this.products.find(p => p.id === id);
  }
  
  create(item: Product2): void {
    this.products.push(item);
  }
  
  update(id: number, item: Product2): void {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = item;
    }
  }
  
  delete(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }
}

/**
 * Generic Classes
 */

class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
  
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
  
  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const stringStack = new Stack<string>();
stringStack.push('hello');
stringStack.push('world');

/**
 * Generic Default Types
 */

interface Container<T = string> {
  value: T;
}

const strContainer: Container = { value: 'hello' }; // Uses default string
const numContainer: Container<number> = { value: 42 }; // Custom type

/**
 * Type Parameters with Multiple Constraints
 */

interface Named {
  name: string;
}

interface Aged {
  age: number;
}

// T must satisfy both interfaces
function processUser<T extends Named & Aged>(user: T): string {
  return `${user.name} is ${user.age} years old`;
}

processUser({ name: 'John', age: 30 }); // OK

// ============================================================
// 7. UNION & INTERSECTION TYPES
// ============================================================

/**
 * Union Types:
 * A variable can be one of several types
 * Use | (pipe) operator
 * 
 * Common use case: function that accepts multiple types
 */

// Function returning string or number
function getId(): string | number {
  return Math.random() > 0.5 ? '123' : 123;
}

const id = getId();
// Before type narrowing, we can't access type-specific properties
// if (typeof id === 'string') { }

/**
 * Discriminated Unions:
 * Union types with a common property to distinguish them
 * More type-safe than regular unions
 */

type Success = {
  status: 'success';
  data: string;
};

type Error2 = {
  status: 'error';
  message: string;
};

type Response2 = Success | Error2;

function handleResponse2(response: Response2) {
  // Discriminate by status property
  if (response.status === 'success') {
    console.log(response.data); // TypeScript knows this is Success
  } else {
    console.log(response.message); // TypeScript knows this is Error
  }
}

/**
 * Intersection Types:
 * Combines multiple types into one
 * Variable must satisfy ALL types
 * Use & (ampersand) operator
 */

interface Printable {
  print(): void;
}

interface Serializable {
  serialize(): string;
}

// Must have both print() and serialize() methods
type Document = Printable & Serializable;

const doc: Document = {
  print() {
    console.log('Printing...');
  },
  serialize() {
    return 'serialized document';
  }
};

// ============================================================
// 8. CONDITIONAL & MAPPED TYPES
// ============================================================

/**
 * Conditional Types:
 * Types that depend on a condition
 * Syntax: T extends U ? X : Y
 * 
 * "If T extends U, then type is X, otherwise Y"
 */

// Simple conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<'hello'>; // true
type B = IsString<42>; // false

/**
 * Conditional Types in Generics (practical use)
 */

type Flatten<T> = T extends Array<infer U> ? U : T;

type Str = Flatten<string[]>; // string
type Num = Flatten<number>; // number

/**
 * Built-in Conditional Types:
 * TypeScript provides many utility types based on conditionals
 */

// Exclude<T, U> - remove types from T that are assignable to U
type NotString = Exclude<'a' | 'b' | string | number, string>; // number | 'a' | 'b'

// Extract<T, U> - pick types from T that are assignable to U
type OnlyString = Extract<string | number | boolean, string>; // string

// ReturnType<T> - extract return type from function
type GetReturn = ReturnType<() => string>; // string

/**
 * Mapped Types:
 * Create new types by transforming properties of existing types
 * Iterate over properties and create new type
 */

interface User4 {
  name: string;
  email: string;
  age: number;
}

// Make all properties optional
type Partial2<T> = {
  [P in keyof T]?: T[P];
};

type PartialUser = Partial2<User4>;
// Same as: { name?: string; email?: string; age?: number; }

// Make all properties readonly
type ReadonlyUser = {
  readonly [P in keyof User4]: User4[P];
};

// Make all properties nullable
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type NullableUser = Nullable<User4>;
// Same as: { name: string | null; email: string | null; age: number | null; }

// Create getter functions for each property
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type UserGetters = Getters<User4>;
/* Same as: {
  getName: () => string;
  getEmail: () => string;
  getAge: () => number;
} */

/**
 * Built-in Utility Types:
 * TypeScript provides many mapped types for common transformations
 */

// Partial<T> - make all properties optional
type PartialProduct = Partial<Product2>;

// Required<T> - make all properties required (opposite of Partial)
type RequiredProduct = Required<PartialProduct>;

// Readonly<T> - make all properties readonly
type ReadonlyProduct = Readonly<Product2>;

// Pick<T, K> - select specific properties
type ProductPreview = Pick<Product2, 'name' | 'price'>;
// Same as: { name: string; price: number; }

// Omit<T, K> - exclude specific properties
type ProductWithoutId = Omit<Product2, 'id'>;
// Same as: { name: string; price: number; }

// Record<K, T> - create object with specific keys and value type
type Roles = 'admin' | 'user' | 'guest';
type RolePermissions = Record<Roles, string[]>;
// Same as: { admin: string[]; user: string[]; guest: string[]; }

// ============================================================
// 9. TYPE GUARDS & TYPE NARROWING
// ============================================================

/**
 * Type Guards:
 * Code that narrows down type from wider to more specific type
 * Allows accessing type-specific properties and methods safely
 * 
 * Different ways to narrow types:
 * 1. typeof operator
 * 2. instanceof operator
 * 3. Custom type guard (type predicate)
 * 4. Discriminated unions
 */

/**
 * typeof Narrowing:
 * Most basic type guard using typeof operator
 */

function processValue(value: string | number | boolean): void {
  // Type narrowing with typeof
  if (typeof value === 'string') {
    console.log(value.toUpperCase()); // value is string
  } else if (typeof value === 'number') {
    console.log(value.toFixed(2)); // value is number
  } else {
    console.log(!value); // value is boolean
  }
}

/**
 * instanceof Narrowing:
 * Type guard for class instances
 */

class Dog2 {
  bark(): void {
    console.log('Woof!');
  }
}

class Cat {
  meow(): void {
    console.log('Meow!');
  }
}

function makeSound(animal: Dog2 | Cat): void {
  if (animal instanceof Dog2) {
    animal.bark(); // animal is Dog2
  } else {
    animal.meow(); // animal is Cat
  }
}

/**
 * Custom Type Guard (Type Predicate):
 * Create function that returns type predicate (obj is Type)
 * More flexible than typeof/instanceof
 */

interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

// Type predicate: this function returns whether value is Fish
function isFish(animal: any): animal is Fish {
  return (animal as Fish).swim !== undefined;
}

function isBird(animal: any): animal is Bird {
  return (animal as Bird).fly !== undefined;
}

function moveAnimal(animal: Fish | Bird): void {
  if (isFish(animal)) {
    animal.swim(); // animal is narrowed to Fish
  } else {
    animal.fly(); // animal is narrowed to Bird
  }
}

/**
 * Optional Chaining (?.):
 * Safely access nested properties that might be null/undefined
 */

interface Config {
  database?: {
    host?: string;
    port?: number;
  };
}

const config: Config = {};

// Without optional chaining: Runtime error if database is undefined
// const host = config.database.host;

// With optional chaining: Returns undefined if database is undefined
const host = config.database?.host; // safe

const connectionString = config.database?.host ?? 'localhost'; // uses ?? for default

/**
 * Nullish Coalescing Operator (??):
 * Returns right side if left is null or undefined
 * Different from || which treats 0, '', false as falsy
 */

const values = {
  name: 'John',
  age: 0,
  email: null
};

const age = values.age || 25; // 25 (0 is falsy)
const age2 = values.age ?? 25; // 0 (0 is not nullish)
const email = values.email ?? 'noemail@example.com'; // noemail@example.com

// ============================================================
// 10. MODULES & NAMESPACES
// ============================================================

/**
 * Modules:
 * ES6 modules for organizing code into separate files
 * Each file can export its types, interfaces, classes, functions
 * 
 * In production, use modules over namespaces.
 * Modules provide better encapsulation and are the JavaScript standard.
 */

/**
 * Export Syntax:
 * Named exports: multiple exports from one file
 * Default export: one default export per file
 */

// Example file: User.ts
export interface IUser {
  id: number;
  name: string;
}

export class UserService {
  getUser(id: number): IUser {
    return { id, name: 'John' };
  }
}

export function greetUser(name: string): string {
  return `Hello, ${name}!`;
}

/**
 * Importing:
 * Bring exported items into another file
 */

// import { IUser, UserService, greetUser } from './User';
// import { IUser as User, UserService } from './User';
// import * as userModule from './User';

// Or default export
// export default class DefaultExported {}
// import DefaultExported from './module';

/**
 * Namespaces:
 * Older way to organize code (pre-ES6 modules)
 * Less preferred now, but still used in some legacy codebases.
 * Namespaces are internal to file, modules are external.
 */

namespace Utilities {
  // Private to namespace
  const staticVersion = '1.0.0';
  
  // Exported from namespace (accessible with Utilities.version)
  export const version = '1.0.0';
  
  // Convert function - exported from namespace
  export function stringToNumber(value: string): number {
    return parseInt(value, 10);
  }
  
  export class Logger {
    log(message: string): void {
      console.log(`[${Utilities.version}] ${message}`);
    }
  }
}

const logger = new Utilities.Logger();
logger.log('Hello'); // Output: [1.0.0] Hello

/**
 * Nested Namespaces
 */

namespace MyCompany {
  export namespace Utils {
    export function add(a: number, b: number): number {
      return a + b;
    }
  }
}

const result = MyCompany.Utils.add(5, 3); // 8

// ============================================================
// 11. DECORATORS (Experimental Feature)
// ============================================================

/**
 * Decorators:
 * Special functions that modify classes, methods, or properties
 * Currently experimental - need "experimentalDecorators": true in tsconfig.json
 * Commonly used in frameworks like Angular, NestJS, TypeORM
 * 
 * Decorator Syntax: @decoratorName
 * Applied before class, method, accessor, parameter, or property
 */

/**
 * Class Decorator:
 * Receives constructor function, can wrap it
 */

// Decorator function
function LogClass<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      console.log(`Creating instance of ${constructor.name}`);
      super(...args);
    }
  };
}

// Apply decorator
@LogClass
class MyClass {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
}

// new MyClass('test'); // Logs: Creating instance of MyClass

/**
 * Method Decorator:
 * Modifies method behavior without changing its definition
 */

function Logged(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };
  
  return descriptor;
}

class Calculator2 {
  @Logged
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// const calc = new Calculator2();
// calc.multiply(3, 4); // Logs calling, args, and result

/**
 * Property Decorator:
 * Modifies or validates properties
 */

function Required(target: any, propertyKey: string) {
  let value: any;
  
  const getter = function() {
    return value;
  };
  
  const setter = function(newVal: any) {
    if (newVal === undefined || newVal === null) {
      throw new Error(`${propertyKey} is required`);
    }
    value = newVal;
  };
  
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

class User5 {
  @Required
  name: string = '';
}

// ============================================================
// 12. ERROR HANDLING WITH TYPES
// ============================================================

/**
 * Custom Error Classes:
 * Create typed errors for better error handling
 */

class ValidationError extends Error {
  constructor(
    public readonly fieldName: string,
    public readonly value: any,
    message: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

class DatabaseError extends Error {
  constructor(
    public readonly query: string,
    message: string
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

// Type for possible errors
type ApplicationError = ValidationError | DatabaseError | Error;

/**
 * Type-safe Error Handling
 */

function handleError(error: ApplicationError): void {
  if (error instanceof ValidationError) {
    console.log(`Validation failed for ${error.fieldName}: ${error.value}`);
  } else if (error instanceof DatabaseError) {
    console.log(`Database error on query: ${error.query}`);
  } else {
    console.log(`Unknown error: ${error.message}`);
  }
}

/**
 * Result Pattern / Either Type:
 * Typescript way to handle operations that may fail
 * Avoids exceptions and makes errors explicit in type system
 */

// Result type that can be Success or Failure
type Result<T, E> = 
  | { status: 'success'; value: T }
  | { status: 'failure'; error: E };

// Usage example
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { status: 'failure', error: 'Cannot divide by zero' };
  }
  return { status: 'success', value: a / b };
}

// Type-safe handling
const divisionResult = divide(10, 2);
if (divisionResult.status === 'success') {
  console.log(divisionResult.value); // 5
} else {
  console.log(divisionResult.error); // Error message
}

// ============================================================
// 13. ADVANCED PATTERNS & BEST PRACTICES
// ============================================================

/**
 * Dependency Injection with Types:
 * Make dependencies explicit and testable
 */

interface ILogger {
  log(message: string): void;
}

interface IUserRepository {
  getUserById(id: number): Promise<User4 | null>;
}

class UserService2 {
  constructor(
    private logger: ILogger,
    private repository: IUserRepository
  ) {}
  
  async getUser(id: number): Promise<User4 | null> {
    this.logger.log(`Fetching user ${id}`);
    const user = await this.repository.getUserById(id);
    return user;
  }
}

/**
 * Builder Pattern with Types
 */

interface UserBuilder {
  setName(name: string): UserBuilder;
  setEmail(email: string): UserBuilder;
  setAge(age: number): UserBuilder;
  build(): User4;
}

class UserBuilderImpl implements UserBuilder {
  private name = '';
  private email = '';
  private age = 0;
  
  setName(name: string): UserBuilder {
    this.name = name;
    return this;
  }
  
  setEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }
  
  setAge(age: number): UserBuilder {
    this.age = age;
    return this;
  }
  
  build(): User4 {
    return {
      name: this.name,
      email: this.email,
      age: this.age
    };
  }
}

const user4 = new UserBuilderImpl()
  .setName('John')
  .setEmail('john@example.com')
  .setAge(30)
  .build();

/**
 * Factory Pattern
 */

interface Animal2 {
  makeSound(): void;
}

class Dog3 implements Animal2 {
  makeSound(): void {
    console.log('Woof!');
  }
}

class Cat2 implements Animal2 {
  makeSound(): void {
    console.log('Meow!');
  }
}

class AnimalFactory {
  static createAnimal(type: 'dog' | 'cat'): Animal2 {
    switch(type) {
      case 'dog':
        return new Dog3();
      case 'cat':
        return new Cat2();
    }
  }
}

const animal = AnimalFactory.createAnimal('dog');
animal.makeSound(); // Woof!

/**
 * Async/Await with Proper Types
 */

async function fetchUserData(id: number): Promise<User4> {
  try {
    // Assuming API returns user data
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: User4 = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Using Generics with Async Functions
 */

async function fetchData2<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

// Usage with type parameter
// const user = await fetchData2<User4>('/api/user/1');

// ============================================================
// BEST PRACTICES SUMMARY
// ============================================================

/**
 * TypeScript Best Practices:
 * 
 * 1. STRICT MODE
 *    - Enable "strict": true in tsconfig.json
 *    - Catches more potential errors at compile time
 * 
 * 2. AVOID 'any'
 *    - Use specific types or generics instead
 *    - If necessary, consider 'unkno wn' instead
 * 
 * 3. USE INTERFACES FOR OBJECT SHAPES
 *    - Defines contracts for object structure
 *    - Better than inline types for reusability
 * 
 * 4. PREFER CONST FOR IMMUTABILITY
 *    - Use const by default, let when needed, avoid var
 * 
 * 5. TYPE YOUR FUNCTION PARAMETERS AND RETURNS
 *    - Makes functions self-documenting
 *    - Prevents bugs
 * 
 * 6. USE DISCRIMINATED UNIONS
 *    - Type-safe than plain unions
 *    - Better for state management and handlers
 * 
 * 7. LEVERAGE TYPE INFERENCE
 *    - Don't over-annotate simple types
 *    - Let TypeScript infer when obvious
 * 
 * 8. USE GENERICS FOR REUSABILITY
 *    - Avoid code duplication
 *    - Maintain type safety
 * 
 * 9. USE READONLY WHERE APPROPRIATE
 *    - Prevents accidental modifications
 *    - Makes code intent clear
 * 
 * 10. DOCUMENT COMPLEX TYPES
 *     - Use JSDoc comments for clarity
 *     - Help future maintainers (including yourself)
 * 
 * 11. USE UTILITY TYPES
 *     - Pick, Omit, Partial, Required, etc.
 *     - Avoid repeating type definitions
 * 
 * 12. USE ENUMS FOR KNOWN SETS OF VALUES
 *     - String enums more readable than numbers
 *     - const enums for better performance
 * 
 * 13. PROPER ERROR HANDLING
 *     - Create typed error classes
 *     - Use Result/Either pattern instead of throwing
 * 
 * 14. MODULARIZE WITH MODULES
 *     - Organize code into logical modules
 *     - Use clear export/import boundaries
 */

// ============================================================
// CONFIGURATION (tsconfig.json)
// ============================================================

/**
 * Essential tsconfig.json Settings:
 * 
 * {
 *   "compilerOptions": {
 *     "target": "ES2020",              // JavaScript version target
 *     "module": "commonjs",             // Module system
 *     "lib": ["ES2020"],                // Available APIs
 *     "outDir": "./dist",               // Output directory
 *     "rootDir": "./src",               // Source directory
 *     "strict": true,                   // Enable all strict checks
 *     "esModuleInterop": true,          // Compat with CommonJS
 *     "skipLibCheck": true,             // Skip type checking of declaration files
 *     "forceConsistentCasingInFileNames": true, // Enforce case consistency
 *     "resolveJsonModule": true,        // Allow importing JSON
 *     "declaration": true,              // Generate .d.ts files
 *     "sourceMap": true,                // Generate source maps for debugging
 *     "noImplicitAny": true,            // Error on implicit any
 *     "strictNullChecks": true,         // Strict null checking
 *     "strictFunctionTypes": true,      // Strict function type checking
 *     "noUnusedLocals": true,           // Error on unused variables
 *     "noUnusedParameters": true,       // Error on unused parameters
 *     "noImplicitReturns": true         // Error if not all code paths return
 *   },
 *   "include": ["src/**/*"],
 *   "exclude": ["node_modules", "dist"]
 * }
 */

// ============================================================
// END OF COMPREHENSIVE TYPESCRIPT GUIDE
// ============================================================
