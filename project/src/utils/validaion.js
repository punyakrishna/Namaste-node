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

const validateProfileData = async (req, res, next) => {
  try {
    const updateData = req.body;

    // Check if emailId is being attempted to update
    if (updateData.emailId) {
      return res
        .status(400)
        .send({ error: "Updating emailId is not allowed." });
    }

    if (updateData.password) {
      return res
        .status(400)
        .send({ error: "Updating password is not allowed." });
    }

    const allowedFeilds = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "skills",
      "about",
      "profilePic",
    ];

    const sanitizedData = Object.keys(updateData)
      .filter((key) => allowedFeilds.includes(key))
      .reduce((acc, cur) => {
        acc[cur] = updateData[cur];
        return acc;
      }, {});

    req.userData = sanitizedData;
    next();
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = { validateSignUpData, validateLoginData, validateProfileData };
