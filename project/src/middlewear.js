const express = require("express");
const { adminAuth, userAuth } = require("./utils/auth");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); //Without this, req.body might be undefined\

app.use("/admin", adminAuth);
app.get("/user", userAuth, (req, res) => {
  res.send("Sent user details");
});

app.get("/user/login", (req, res) => {
  //Auth is not needed for login
  res.send("Sent user details");
});

// Route handler
app.get("/admin/getusers", (req, res) => {
  res.send("Hello World!");
});

app.delete("/admin/user", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});

//Error handling   -- best way is to use try catch 

app.get("/getUserData", (req, res) => {
  throw new Error("User data not found");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});
