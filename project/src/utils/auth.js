const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = (req, res, next) => {
  // We can check authorization here
  // console.log(req.body.token);
  // const token = req.body.token;

  console.log(req.headers.authorization);
  const token = req.headers.authorization;
  if (token == "Admin") {
    next(); // Passes control to the next middleware or route if the user is authenticated
  } else {
    res.status(401).send("user is not authorized");
  }
};

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies.token) {
      return res.status(401).send({
        message: "Authorization token is missing",
        code: 401,
      });
    }

    const { _id } = await jwt.verify(cookies.token, "NODEDEV@punya");

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).status({
        message: "User doesn't exist",
        code: 400,
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("Authentication error", err);
    res.status(401).send({
      message: "Invalid or expire token",
      code: 401,
    });
  }
};

module.exports = { adminAuth, userAuth };
