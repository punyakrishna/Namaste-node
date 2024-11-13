const connectDB = require("./config/database");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRoute = require("./routes/userRoutes");
// Use JSON middleware before routes - allow apis to accept json data without this it will be
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRoute);

connectDB()
  .then(() => {
    app.listen(7777, () => {
      console.log("Server is listening at port 7777");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// app.get("/feed", async (req, res) => {
//   try {
//     const userData = await User.find();
//     if (!userData) {
//       return res.status(400).send("Users doesn't exist");
//     }

//     res.send(userData);
//   } catch (err) {
//     console.log(err, "fetching users");
//     res.status(500).send("An error occurred while updating the user.");
//   }
// });
