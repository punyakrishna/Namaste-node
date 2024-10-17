const fs = require("fs");
const a = 10;

setImmediate(() => console.log("immediate function"));

Promise.resolve("Promise").then(console.log);

fs.readFile("./data/smalldata.txt", "UTF-8", () => {
  console.log("File read succesfull");
});

setTimeout(() => {
  console.log("Timer done");
}, 0);

function printLog() {
  console.log("a", a);
}

process.nextTick(() => console.log("Process.nextClick"));

printLog();
console.log("last line of the code");

// op
// a 10
// last line of the code
// Process.nextClick
// Promise
// Timer done
// immediate function
// File read succesfull

// Explains the waiting phase--comment the above and run to understand
// const fs = require("fs");

// const a1 = 10;

setImmediate(() => console.log("immediate function"));

Promise.resolve("Promise").then(console.log);

setTimeout(() => {
  console.log("Outer Timer done");
}, 0);

fs.readFile("./data/smalldata.txt", "UTF-8", () => {
  setTimeout(() => {
    console.log("file read Timer done");
  }, 0);

  setImmediate(() => console.log("immediate function"));
  process.nextTick(() => console.log("Process.nextClick"));

  console.log("File read succesfull");
});

function printLog() {
  console.log("a", a);
}

process.nextTick(() => console.log("Process.nextClick"));

printLog();
console.log("last line of the code");

// a 10
// last line of the code
// Process.nextClick
// Promise
// Outer Timer done
// immediate function
// File read succesfull------  after all the callbacks are executed it was waiting at the polling phase from this point it will continue from here only that means it will move to ***check phase*** and it wont restart the cycle
// Process.nextClick --- it will get executed cos it will for every cycle
// immediate function
// file read Timer done

// Next tick example

setImmediate(() => console.log("immediate function"));

Promise.resolve("Promise").then(console.log);

fs.readFile("./data/smalldata.txt", "UTF-8", () => {
  console.log("File read succesfull");
});

setTimeout(() => {
  setTimeout(() => {
    console.log("Inner Timer done");
  }, 0);
  console.log("Timer done");
}, 0);

process.nextTick(() => {
  process.nextTick(() => console.log("inner Next tick"));
  console.log("Process.nextClick");
});

console.log("last line of the code");

// last line of the code
// Process.nextClick
// inner Next tick
// Promise
// Timer done
// immediate function
// Inner Timer done
// File read succesfull
