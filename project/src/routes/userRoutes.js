const express = require("express");
const userRoute = express.Router();
const { userAuth } = require("../utils/auth");
const connectionRequest = require("../models/connectionRequestSchema");

const USER_SAFE_DATA = "firstName lastName age about gender profilepic";

userRoute.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const connectionRequests = await connectionRequest
      .find({
        $or: [
          { senderId: loggedinUser._id, status: "accepted" },
          { recieverId: loggedinUser._id, status: "accepted" },
        ],
      })
      .populate("senderId", USER_SAFE_DATA);

    // const data = connectionRequests.map((row) => row.senderId);
    res.json({
      message: "Succesfully fetched",
      connectionRequests,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong: " + err.message);
  }
});

userRoute.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const connectionRequests = await connectionRequest
      .find({
        recieverId: loggedinUser._id,
        status: "interested",
      })
      // .populate("senderId", ["firstName", "lastName"]); //we have to give a user collection ref in a schema, if we dont mention the fields like fname and lname it will fetch and give all the data
      .populate("senderId", USER_SAFE_DATA);

    res.json({
      message: "Succesfully fetched",
      connectionRequests,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong: " + err.message);
  }
});

userRoute.get("/user/feed", userAuth, async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong: " + err.message);
  }
});

module.exports = userRoute;
