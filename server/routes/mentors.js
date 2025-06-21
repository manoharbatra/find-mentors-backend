const express = require("express");
const router = express.Router();
const Mentor = require("../models/Mentor");

// POST /api/mentors - Add a new mentor
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json({ message: "Mentor saved successfully", mentor });
  } catch (err) {
    console.log("Error");
    res.status(400).json({ error: err.message });
  }
});

// GET /api/mentors - Get all mentors
router.get("/", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
