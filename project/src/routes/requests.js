const express = require("express");
const { userAuth } = require("../utils/auth");
const requestRouter = express.Router();
const ConnectionRequestModel = require("../models/connectionRequestSchema");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    const senderId = req.user.id; //attached the logged in user object in userAuth
    const recieverId = req.params.toUserId;
    const status = req.params.status;

    try {
      const reqBody = {
        senderId,
        recieverId,
        status,
      };
      const connectionRequest = new ConnectionRequestModel(reqBody);

      if (recieverId == senderId) {
        //alternate for the pre method there in schema
        return res.status(400).send({
          message: "Connection cannot be established",
        });
      }

      const recieverData = await User.findById(recieverId);
      if (!recieverData) {
        return res.status(400).send({
          message: "user doesn't exist",
        });
      }

      const isExistingRequest = await ConnectionRequestModel.findOne({
        $or: [
          {
            senderId,
            recieverId,
          },
          {
            senderId: recieverId,
            recieverId: senderId,
          },
        ],
      }); //Indexing is imp here connectionRequestSchema.index({ senderId: 1, recieverId: 1 });

      if (isExistingRequest) {
        return res.status(400).send({
          message: "Connection request already exist",
        });
      }

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).send({
          message: "Invalid status type:" + status,
        });
      }

      const data = await connectionRequest.save();
      console.log(data, ":reqBody");
      res.send({
        message:
          status === "interested"
            ? "Request sent succefully"
            : `${req.user.firstName} has ignored ${recieverData.firstName}`,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send("Something went wrong: " + err.message);
    }
  }
);

module.exports = requestRouter;
