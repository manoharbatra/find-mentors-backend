const express = require("express");
const router = express.Router();
const Mentor = require("../models/Mentor");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const mentor = new Mentor({ ...req.body, active: false });
    await mentor.save();
    res.status(201).json({ message: "Mentor saved successfully", mentor });
  } catch (err) {
    console.log("Error");
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
