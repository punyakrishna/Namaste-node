// Modules protects thier variables and functions from leaking so we have export them externally

function sum(a, b) {
  console.log(a + b);
}

module.exports = {
  name,
  sum,
};
