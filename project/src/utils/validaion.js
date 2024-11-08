const validator = require("validator");

const validateSignUpData = (req, res, next) => {
  const { firstName, emailId, password, gender, age } = req.body;

  if (!firstName || !age || !gender || !password) {
    return res.status(400).send("Please fill out all the required fields");
  } else if (firstName.length < 5) {
    return res.status(400).send("First name is not valid");
  }

  if (!validator.isEmail(emailId)) {
    return res.status(400).send("Please enter a valid email addess");
  }

  if (!["Female", "Male", "Others"].includes(gender)) {
    return res.status(400).send("Please enter a valid gender");
  }

  next();
};

const validateLoginData = (req, res, next) => {
  const { emailId, password } = req.body;

  if (!emailId || !password) {
    return res.status(400).send("Please fill out all the required fields");
  }

  if (!validator.isEmail(emailId)) {
    return res.status(400).send("Please enter a valid email addess");
  }
  next();
};

module.exports = { validateSignUpData, validateLoginData };
