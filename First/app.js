// const math = require("./math");

// console.log("Addition:", math.add(10, 20));
// console.log("Substraction:", math.sub(10, 20));
// console.log("Multiplication:", math.mult(10, 20));

const path = require('path');
const info = path.parse('/home/user/file.txt');
console.log(info);
// { root: '/', dir: '/home/user', base: 'file.txt', ext: '.txt', name: 'file' }
