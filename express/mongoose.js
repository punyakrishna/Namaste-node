const mongoose = require("mongoose");
const express = require("express");
const app = express();

const dbUrl =
  "mongodb+srv://punyakrishna2000:oMRVaQgelnYkrmEs@punya-node.rhoit.mongodb.net/mydb?retryWrites=true&w=majority&appName=Punya-node";
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(6363, () => console.log("Succesfully connected"))
  )
  .catch((err) => {
    console.log(err, "connect failed");
  });

// app.use(userRoutes);

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    Firstname: {
      type: String,
      required: true,
    },
    Lastname: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    Phonenumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

app.use(express.json());
// app.use(morgan("dev"));

// Define routes directly in the main file
app.get("/users", async (req, res) => {
  console.log("Fetching users...");
  const data = await User.find();
  console.log(data, "datadatadata");
  // .then((result) => {
  //   console.log(res);
  //   res.json({
  //     code: 200,
  //     user: result,
  //     message: "Fetched successfully",
  //   });
  // })
  // .catch((err) =>
  //   res.json({
  //     code: 400,
  //     message: "Cannot fetch the details",
  //   })
  // );
});

app.get("/add-users", async (req, res) => {
  await addUser(req, res);
});

const addUser = async (req, res) => {
  try {
    // const { email } = req.body;
    // const existingUser = await User.findOne({ email });

    // if (existingUser) {
    //   return res.status(400).json({ error: "Email already exists" });
    // }

    const data = {
      Firstname: "punya",
      Lastname: "n",
      City: "nana",
      Phonenumber: 646664646466,
    };

    const user = new User(data);
    user.save(req);
    res.status(200).json({
      message: "User created successfully",
    });
    
  } catch {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Failed to save user" });
  }
};
