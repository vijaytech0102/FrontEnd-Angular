// Array methods
let arr2 = [1, 2, 3, 4, 5];
console.log(arr2.length);
console.log(arr2.push(6)); // adds an element to the end of the array
console.log(arr2.pop()); // removes the last element from the array
console.log(arr2.shift()); // removes the first element from the array
console.log(arr2.unshift(0)); // adds an element to the beginning of the array
console.log(arr2.indexOf(3)); // returns the index of the first occurrence of a specified value
console.log(arr2.slice(1, 4)); // returns a shallow copy of a portion of an array into a new array object
console.log(arr2.splice(1, 2, 44, 55)); // changes the contents of an array by removing or replacing existing elements and/or adding new elements in place
console.log(arr2.concat([7, 8])); // merges two or more arrays into a new array
console.log(arr2.join("-")); // joins the array elements into a string with a specified separator
console.log(arr2.reverse()); // reverses the order of the elements in the array
console.log(arr2.sort()); // sorts the elements of the array in place and returns the sorted array

// array iteration methods
let arr3 = [1, 2, 3, 4, 5];
arr3.forEach(num => console.log(num));
let squared = arr3.map(num => num * num);
console.log(squared); // [1, 4, 9, 16, 25]
let evenNumbers = arr3.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]
let sum = arr3.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

// multidimensional arrays
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log(matrix[0][1]);
// Output: 2
console.log(matrix[1][2]);
// Output: 6

// array destructuring
let [a, b, c] = arr3;
console.log(a, b, c); // Output: 1 2 3
let [first, ...rest] = arr3;
console.log(first); // Output: 1
console.log(rest); // Output: [2, 3, 4, 5]

// array spread operator
// explain spread operator
let arr5 = [9, 10];
let combined2 = [...arr3, ...arr5];
console.log(combined2); // Output: [1, 2, 3, 4, 5, 9, 10]
let arr4 = [6, 7, 8];
let combined = [...arr3, ...arr4];
console.log(combined); // Output: [1, 2, 3, 4, 5, 6, 7, 8]  

// array from string
let str = "Hello";
let arrFromStr = Array.from(str);
console.log(arrFromStr); // Output: ['H', 'e', 'l', 'l', 'o']

// array of objects
let users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];
let names = users.map(user => user.name);
console.log(names); // Output: ['Alice', 'Bob', 'Charlie']  

// array of arrays
let arrayOfArrays = [[1, 2], [3, 4], [5, 6]];
let flattened = arrayOfArrays.reduce((acc, val) => acc.concat(val), []);
console.log(flattened); // Output: [1, 2, 3, 4, 5, 6]

// array of functions
let funcArray = [
    () => console.log("Function 1"),
    () => console.log("Function 2"),
    () => console.log("Function 3")
];
funcArray.forEach(func => func()); // Output: Function 1, Function 2, Function 3

// array of mixed types
let mixedArray = [1, "Hello", true, { name: "Alice" }, [1, 2, 3], () => console.log("Function in array")];
console.log(mixedArray); // Output: [1, "Hello", true, { name: "Alice" }, [1, 2, 3], function]
mixedArray[5](); // Output: Function in array

// famous interview problems in Arrays
//  1. Two Sum
// Given an array of integers, return indices of the two numbers such that they add up to a specific target.
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return null; // Return null if no solution is found
}

// dry run
// 
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target)); // Output: [0, 1]



