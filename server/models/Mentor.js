const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: String,
  designation: String,
  domain: String,
  expertise: String,
  yoe: String,
  skills: [String],
  companies: [String],
  industry: [String],
  linkedinLink: String,
  topmateLink: String,
  active: Boolean,
});

module.exports = mongoose.model("Mentor", mentorSchema);
