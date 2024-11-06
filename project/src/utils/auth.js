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

const userAuth = (req, res, next) => {
  // We can check authorization here
  // console.log(req.body.token);
  // const token = req.body.token;
  const token = req.headers.authorization;
  if (token == "Punya") {
    next(); // Passes control to the next middleware or route if the user is authenticated
  } else {
    res.status(401).send("user is not authorized");
  }
};
module.exports = { adminAuth, userAuth };
