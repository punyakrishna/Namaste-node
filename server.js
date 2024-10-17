const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.method);
  let str;
  switch (req.url) {
    case "/":
      str = "Home page";
      break;
    case "/about":
      str = "About page";
      break;
  }
  res.end(str);
});

server.listen(4000, "localhost", () => {
  console.log("server listening at port 4000");
});
