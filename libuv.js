const fs = require("fs");
const https = require("https");
const http = require("http");
const crypto = require("node:crypto");

let a = 10;
let b = 20;

//since it is a syncroous task if the file size is more or if its takes up some time it will block the main thread
fs.readFileSync("./data/blob.txt", () => {});

// password base key derivation function
crypto.pbkdf2Sync(
  "password12345",
  "salt",
  50000000,
  50,
  "sha512",
  (err, key) => {
    console.log("Key is generated");
  }
);

console.log("It's blocked above");

// asynchronous
https
  .get("https://jsonplaceholder.typicode.com/posts/1", (res) => {
    let data = "";

    // A chunk of data has been received.
    res.on("data", (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
    res.on("end", () => {
      console.log(JSON.parse(data));
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });

setTimeout(() => {
  console.log("set timeout");
}, 5000);

fs.readFile("./data/smalldata.txt", "UTF-8", (err, data) => {
  console.log("File data:");
});

function sum() {
  return a + b;
}

console.log("sum:", sum());

//output ---- sum:30
//            File data:punya this is the text
//            {
//              userId: 1,
//              id: 1,
//              title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
//              body: 'quia et suscipit\n' +
//                'suscipit recusandae consequuntur expedita et cum\n' +
//                'reprehenderit molestiae ut ut quas totam\n' +
//                'nostrum rerum est autem sunt rem eveniet architecto'
//`           }
