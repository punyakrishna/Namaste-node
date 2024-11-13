const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is not correct",
      },
    },
  },
  {
    timestamps: true,
  }
);
connectionRequestSchema.index({ senderId: 1, recieverId: 1 });

connectionRequestSchema.pre("save", function (next) {
  //before this function will get called
  //here this will point to the current connection request instance

  //check if the sender user id and reciever user id are same

  if (this.senderId.equals(this.recieverId)) {
    throw new Error("Cannot send connection request to yourself"); //we can check this at api level also
  }
  next();
});

// const ConnectionRequestModel =
module.exports = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
