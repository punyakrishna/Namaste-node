// console.log(global)   //global object
// console.log(this); //empty object
// console.log(globalThis); //its proposed in 2020 --- a common name of global object accross all the platfoems ex:- browser, nodejs any runtime env

console.log(globalThis === global); //true-- points to the same reference



const { sum, name } = require("../otherfile");

let a = 10,
  b = 10;

sum(a, b);
console.log(name);
