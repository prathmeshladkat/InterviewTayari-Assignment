const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

//this middleware read json data convert to javascript oject and put it in req.body
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const submissionRouter = require("./routes/submissions");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", submissionRouter);

/*app.post("/submissions", async (req, res) => {
  try {
    // Extract user information from the authenticated request
    const userId = req.user.id;

    // Extract submission data from the request body
    const { name, country, company, questions } = req.body;

    // Validate input (basic validation example)
    if (
      !name ||
      !country ||
      !company ||
      !questions ||
      !Array.isArray(questions)
    ) {
      return res.status(400).json({
        message: "All fields are required and questions must be an array.",
      });
    }

    // Create a new submission
    const newSubmission = new Submission({
      name,
      country,
      company,
      questions,
      userId, // Link the submission to the logged-in user
    });

    // Save the submission to the database
    const savedSubmission = await newSubmission.save();

    // Respond with the saved submission
    res.status(201).json(savedSubmission);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Server error. Could not create submission." });
  }
});*/

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.log("ERROR : " + err.message);
    console.error("Database cannot be connected!!");
  });
