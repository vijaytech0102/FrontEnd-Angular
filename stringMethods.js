// String methods
let str2 = "Hello World!";
console.log(str2.length);
console.log(str2.toUpperCase());
console.log(str2.toLowerCase());
console.log(str2.indexOf("World"));
console.log(str2.slice(0, 5));
console.log(str2.replace("World", "JavaScript"));
console.log(str2.split(" ")); // splits the string into an array of words
console.log(str2.trim()); // removes whitespace from both ends of the string
console.log(str2.charAt(0)); // returns the character at the specified index
console.log(str2.charCodeAt(0)); // returns the Unicode of the character at the specified index
console.log(str2.includes("Hello")); // checks if the string contains a specified value
console.log(str2.startsWith("Hello")); // checks if the string starts with a specified value
console.log(str2.endsWith("!")); // checks if the string ends with a specified value
// join method is used to join the elements of an array into a string
let arr = ["Hello", "World"];
console.log(arr.join(" ")); // joins the array elements into a string with a space in between   

// template literals
let name = "Alice";
let greeting = `Hello, ${name}! Welcome to JavaScript.`;
console.log(greeting);

// String interpolation with expressions
let a = 5;
let b = 10;
console.log(`The sum of ${a} and ${b} is ${a + b}.`); // Output: The sum of 5 and 10 is 15. 

// Multiline strings with template literals
let multilineString = `This is a string
that spans multiple
lines.`;
console.log(multilineString); 
// Output: This is a string
// that spans multiple
// lines.


// String padding
let str3 = "5";
console.log(str3.padStart(3, "0")); // Output: 005
console.log(str3.padEnd(3, "0")); // Output: 500

// String repetition
let str4 = "abc";
console.log(str4.repeat(3)); // Output: abcabcabc

// String normalization
let str5 = "café";
let normalizedStr = str5.normalize("NFC");
console.log(normalizedStr); // Output: café
// String raw
let rawString = String.raw`This is a raw string with a newline character: \n`;
console.log(rawString); // Output: This is a raw string with a newline character: \n
// String methods with regular expressions
let str6 = "The quick brown fox jumps over the lazy dog.";
console.log(str6.match(/\b\w{4}\b/g)); // Output: ['over', 'lazy']
console.log(str6.replace(/\b\w{4}\b/g, "****")); // Output: The quick brown fox jumps **** the **** dog.

// String methods with Unicode characters
let str7 = "😀😃😄😁";
console.log(str7.length); // Output: 4
console.log(str7.codePointAt(0)); // Output: 128512 (Unicode code point for 😀)
console.log(String.fromCodePoint(128512)); // Output:   😀

// String methods with internationalization
let str8 = "Hello, 世界!";
console.log(str8.length); // Output: 9
console.log(str8.charAt(7)); // Output: 世
console.log(str8.charCodeAt(7)); // Output: 19990 (Unicode code point for 世)
console.log(str8.normalize("NFC")); // Output: Hello, 世界!

