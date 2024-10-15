// All the code of the modules are wrapped inside a function--- this function IIFE that means immediately invoked function expression
// -- nodejs psses a module as parmeter to the function which is wrapping
// Modules protects thier variables and functions from leaking so we have export them externally

// 5-mechanisms require
// 1)  Resolving the module i.e it checks for the file type whether it is local file, json file or node one
// 2)  Loading the module i.e it loads the file content will be loaded
// 3)  Wraps the whole code inside the IIFE
let wrap = function (script) {
  // eslint-disable-line func-style
  return Module.wrapper[0] + script + Module.wrapper[1];
};
// Module.wrapper[0]; --- (function (exports, require, module, __filename, __dirname) {
// Module.wrapper[1] ----  })  /n means it will just move to next line
const wrapper = [
  "(function (exports, require, module, __filename, __dirname) { ",
  "\n});",
];

console.log(wrap, ":wrap");

// 4)  Evaluation -- it will check for the module.exports
// 5)  caching

// common js modules Run in a non-strict mode

// synchronous way of importing
let x = 20;
function sum(a, b) {
  console.log(a + b);
}

console.log(module.exports); //empty object
module.exports = { x, sum };

// module.exports.x=x
// module.sxports.sum=sum
