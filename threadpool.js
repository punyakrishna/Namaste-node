const crypto = require("node:crypto");
const fs = require("fs");

//op
//4,3,1,2 -- doesn't matter the order but 5th one will take time and execute only after this 4 coz the thread pool size is 4 each thread will be assigned a task so 5th one will be waiting

process.env.UV_THREADPOOL_SIZE = 2;   //to change th threadpool size

crypto.pbkdf2("password12345", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("1st Key is generated");
});

crypto.pbkdf2("password12345", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("2nd Key is generated");
});

crypto.pbkdf2("password12345", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("3rd Key is generated");
});

crypto.pbkdf2("password12345", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("4th Key is generated");
});

crypto.pbkdf2("password12345", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("5th Key is generated");
});

// fs.readFile("./data/smalldata.txt", "UTF-8", () => {
//   console.log("File read succesfull");
// });
