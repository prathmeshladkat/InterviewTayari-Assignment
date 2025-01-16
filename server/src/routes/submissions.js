const express = require("express");
const submissionRouter = express.Router();
const Submission = require("../models/submission");
const { userAuth } = require("../middlewares/auth");

submissionRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const submissions = await Submission.find().populate(
      "userId",
      "name email"
    ); // Optionally populate user details
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

submissionRouter.get("/submissions/user", userAuth, async (req, res) => {
  try {
    const userId = req.user._id; // Extracted from the authenticated token
    const userSubmissions = await Submission.find({ userId });
    res.json(userSubmissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

submissionRouter.post("/mysubmissions", userAuth, async (req, res) => {
  try {
    // Extract user information from the authenticated request
    const userId = req.user._id;

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
});

// Add a search route to your submissionRouter
submissionRouter.get("/search", userAuth, async (req, res) => {
  try {
    const searchQuery = req.query.query;

    // Perform a case-insensitive search
    const submissions = await Submission.find({
      company: { $regex: searchQuery, $options: "i" },
    }).populate("userId", "name email");

    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = submissionRouter;
