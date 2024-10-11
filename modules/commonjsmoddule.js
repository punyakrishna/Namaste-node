// Modules protects thier variables and functions from leaking so we have export them externally


// synchronous way of importing 
let x = 20;
function sum(a, b) {
  console.log(a + b);
}

module.exports = { x, sum };