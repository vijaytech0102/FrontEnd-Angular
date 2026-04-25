let text = "Apple, Banana, Kiwi";
let part = text.slice(7, 13);
console.log(part);


let str = "Apple, Banana, Kiwi";
let part1 = str.substring(7, 13);
console.log(part1);


let str1 = "Apple, Banana, Kiwi";
let part2 = str1.substr(7, 6);
console.log(part2);

let tex = "Please visit Microsoft!";
let newText = tex.replace("Microsoft", "W3Schools");
console.log(newText);

let age=19
if (age < 18) {
    console.log("Sorry, you are too young to drive this car. Powering off");
} else if (age == 18) {
    console.log("Congratulations on your first year of driving. Enjoy the ride!");
} else {
    console.log("Powering On. Enjoy the ride!");
}

switch (1) {
    case 1:
        
        break;

    default:
        break;
}

//operators
let x = 5;
let y = 2;
let z = x + y;
console.log(z);

let a = 5;
let b = 2;
let c = a - b;
console.log(c);

let d = 5;
let e = 2;
let f = d * e;
console.log(f);

let g = 5;
let h = 2;
let i = g / h;
console.log(i);

let j = 5;
let k = 2;
let l = j % k;
console.log(l);

let m = 5;
let n = 2;
let o = m ** n;
console.log(o);

//relational operators
let p = 5;
let q = 2;
console.log(p > q);
console.log(p < q);
console.log(p >= q);
console.log(p <= q);
console.log(p == q);
console.log(p != q);    

//logical operators
let r = 5;
let s = 2;
console.log(r > 3 && s < 3);
console.log(r > 3 || s < 1);
console.log(!(r > 3 && s < 3)); 

// bitwise operators
let t = 5; // 0101 in binary
let u = 2; // 0010 in binary
console.log(t & u); // bitwise AND
console.log(t | u);
console.log(t ^ u); // bitwise XOR
console.log(~t);
console.log(t << 1); // left shift
console.log(t >> 1); // right shift

// assignment operators
let v = 5;
v += 2; // equivalent to v = v + 2
console.log(v);
v -= 2; // equivalent to v = v - 2
console.log(v);
v *= 2; // equivalent to v = v * 2
console.log(v);
v /= 2; // equivalent to v = v / 2
console.log(v);
v %= 2; // equivalent to v = v % 2
console.log(v);
v **= 2; // equivalent to v = v ** 2
console.log(v); 

// == vs ===
let w = 5;      
let y1 = "5";
console.log(w == y1); // true, because it converts the string to a number
console.log(w === y1); // false, because it does not convert the string to a number

//loops
// for loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}
// nested for loop
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
        console.log(`i: ${i}, j: ${j}`);
    }
}
// while loop
let ptr = 567;
while (ptr < 5) {
    console.log(ptr);
    ptr++;
}

// do-while loop
let count = 0;
do {
    console.log(count);
    count++;
} while (count < 5);

