const connectDB = require("./config/database");
const express = require("express");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

// Use JSON middleware before routes
app.use(express.json());

connectDB()
  .then(() => {
    app.listen(7777, () => {
      console.log("Server is listening at port 7777");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();
    res.send("User added successfully");

    // const { emailId } = req.body;
    // const existingUser = await User.findOne({ emailId });

    // if (!existingUser) {
    //   // Creating a new instance of the user model
    //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //   const user = new User({
    //     ...req.body,
    //     password: hashedPassword,
    //   });
    //   await user.save(); // Saving the user model instance
    //   res.send("User added successfully");
    // } else {
    //   res.status(400).send({ error: "Email already exists" });
    // }
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const existingUser = await User.findOne({ emailId });

    console.log(existingUser, ":existingUser");

    if (!existingUser) {
      return res.status(400).send("User not found");
    }

    // Check password (assuming passwords are hashed)
    const isMatch = await bcrypt.compare(password, existingUser.password);
    console.log(isMatch, ":is match");
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    // if (password !== existingUser.password) {
    //   return res.status(400).send("Invalid credentials");
    // }

    // Generate a token
    const token = jwt.sign(
      { emailId: existingUser.emailId }, // Payload
      "your_secret_key", // Replace with your secret key
      { expiresIn: "1h" } // Token expiration
    );

    res.send({ message: "Logged in successfully", token });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while creating the user.");
  }
});

// app.put("/profile/:id", async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const updateData = req.body;
//     const updatedUserData = await User.findByIdAndUpdate(userId, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedUserData) {
//       return res.status(404).send({ Message: "User Not Found" });
//     }

//     res.send({ message: "User updated successfully" });
//   } catch (err) {
//     console.log(err, "Updating user by id");
//     res.status(500).send(err.message);
//   }
// });

app.patch("/profile/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Check if emailId is being attempted to update
    if (updateData.emailId) {
      return res
        .status(400)
        .send({ error: "Updating emailId is not allowed." });
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

    const updatedUserData = await User.findByIdAndUpdate(
      userId,
      sanitizedData,
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
});

app.get("/user", async (req, res) => {
  try {
    const userData = await User.find({ emailId: req.body.emailId });
    if (userData.length <= 0) {
      return res.status(400).send("User doesn't exist");
    }

    res.send(userData);
  } catch (err) {
    console.log(err, "fetching user details by eemail id");
    res.status(500).send("An error occurred while updating the user.");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(400).send("Users doesn't exist");
    }

    res.send(userData);
  } catch (err) {
    console.log(err, "fetching users");
    res.status(500).send("An error occurred while updating the user.");
  }
});

app.delete("/user/:id", async (req, res) => {
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
