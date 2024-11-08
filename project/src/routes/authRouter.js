const express = require("express");
const { validateSignUpData, validateLoginData } = require("../utils/validaion");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", validateSignUpData, async (req, res) => {
  try {
    //When we do Schema level validations, if we have errors it will move to catch block and throw error with status code 500 always
    // const hashedPassword = await bcrypt.hash(req.body.password, 10); //here 10 i a salt number, salt means there will be long string attached to each character --- saltNumber is number of rotations
    // const user = new User({
    //   ...req.body,
    //   password: hashedPassword,
    // });
    // await user.save();
    // return res.send("User added successfully");

    //Custom validation function
    const { emailId } = req.body;
    const existingUser = await User.findOne({ emailId });
    if (!existingUser) {
      // Creating a new instance of the user model
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        ...req.body,
        password: hashedPassword,
      });
      await user.save(); // Saving the user model instance
      res.send({
        message: "User added successfully",
        code: 200,
      });
    } else {
      res.status(400).send({
        message: "Email already exists",
        code: 400,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

authRouter.post("/login", validateLoginData, async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const existingUser = await User.findOne({ emailId });

    //Check if the user exist or not
    if (!existingUser) {
      return res.status(400).send({
        message: "User doesn't exist",
        code: 404,
      });
    }

    // Check password (assuming passwords are hashed)
    const isPasswordValid = await existingUser.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(400).send({
        message: "Invalid credentials",
        code: 401,
      });
    }

    // Generate a token
    //Add the token to cookie and send
    const token = existingUser.getJWT();
    res.cookie("token", token);
    res.send({ code: 200, message: "Logged in successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while creating the user.");
  }
});

module.exports = authRouter;
