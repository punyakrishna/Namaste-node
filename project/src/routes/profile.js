const express = require("express");
const { userAuth } = require("../utils/auth");
const User = require("../models/user");
const { validateProfileData } = require("../utils/validaion");

const profileRouter = express.Router();

profileRouter.patch(
  "/profile/edit/:id",
  userAuth,
  validateProfileData,
  async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUserData = await User.findByIdAndUpdate(
        userId,
        req.userData,
        { new: true, runValidators: true } // new: true returns the updated document
      );

      if (!updatedUserData) {
        return res.status(404).send({ message: "User not found" });
      }

      res.send({ message: "User updated successfully", updatedUserData });
    } catch (err) {
      console.error(err, "Error updating user by id");
      res.status(500).send({
        message: "An error occurred while updating the user.",
        err: err.message,
      });
    }
  }
);

profileRouter.get("/profile/self/:id", userAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(req.user, "req.user");
    if (userId !== req.user._id.toString()) {
      return res.status(404).send({
        message: "Access denied: Unauthorized to access this profile.",
        code: 401,
      });
    }

    // const userData = await User.findById(req.params.id);
    // if (!userData) {
    //   return res.status(400).send("User doesn't exist");
    // }      //instead of this i have attached a user object to the request body in the validation function itself

    res.send(req.user);
  } catch (err) {
    console.log(err, "fetching user details by eemail id");
    res.status(500).send("An error occurred while updating the user.");
  }
});

profileRouter.get("/profile/others", userAuth, async (req, res) => {
  try {
    const userData = await User.findOne({ emailId: req.body.emailId });
    if (!userData) {
      return res.status(400).send({
        message: "User doesn't exist",
        code: 404,
      });
    }

    res.send(userData);
  } catch (err) {
    console.log(err, "fetching user details by eemail id");
    res.status(500).send("An error occurred while updating the user.");
  }
});

profileRouter.delete("/profile/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    console.log(deletedUser, ":deletedUser");
    if (!deletedUser) {
      return res.status(404).send("User doesn't exist");
    }
    res.send({ message: "Deleted successfully", user: deletedUser });
  } catch (err) {
    console.log(err, "delete user");
    res.status(500).send("An error occurred while updating the user.");
  }
});

module.exports = profileRouter;
