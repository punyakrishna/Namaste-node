const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true, //if the unique is set true it will automatically make it indexed or we can use index:true  --- if the index is true 
      lowerCase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["Female", "Male", "Others"].includes(value)) {
          throw new error("Gender data is not valid");
        }
      },
    },
    profilePic: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new error("Invalid url");
        }
      },
    },
    about: {
      type: String,
      default: "This is the default",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = function () {
  return jwt.sign(
    //jsn web token --- header, payload, signature
    { _id: this._id }, // this will referes to the current instance of a model or user object
    "NODEDEV@punya",
    { expiresIn: "1h" } // Token expiration
  );
};

userSchema.methods.validatePassword = async function (userEnteredPassword) {
  const isPasswordValidated = await bcrypt.compare(
    userEnteredPassword,
    this.password
  );
  return isPasswordValidated;
};

module.exports = mongoose.model("User", userSchema);
