const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Mentor name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name must not exceed 100 characters"],
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
      minlength: [2, "Designation must be at least 2 characters"],
    },
    domain: {
      type: String,
      required: [true, "Domain is required"],
      trim: true,
      minlength: [2, "Domain must be at least 2 characters"],
    },
    expertise: {
      type: String,
      required: [true, "Expertise is required"],
      trim: true,
      minlength: [2, "Expertise must be at least 2 characters"],
    },
    yoe: {
      type: String,
      required: [true, "Years of experience is required"],
      match: [/^\d+(\+)?$/, "YOE must be a valid format (e.g. '3' or '5+')"],
    },
    skills: {
      type: [String],
      required: [true, "At least one skill is required"],
      validate: {
        validator: function (arr) {
          return (
            Array.isArray(arr) &&
            arr.length > 0 &&
            arr.every((v) => typeof v === "string" && v.trim().length > 0)
          );
        },
        message: "Skills array must contain at least one non-empty string",
      },
    },
    companies: {
      type: [String],
      required: [true, "At least one company is required"],
      validate: {
        validator: function (arr) {
          return (
            Array.isArray(arr) &&
            arr.length > 0 &&
            arr.every((v) => typeof v === "string" && v.trim().length > 0)
          );
        },
        message: "Companies array must contain at least one non-empty string",
      },
    },
    industry: {
      type: [String],
      required: [true, "At least one industry is required"],
      validate: {
        validator: function (arr) {
          return (
            Array.isArray(arr) &&
            arr.length > 0 &&
            arr.every((v) => typeof v === "string" && v.trim().length > 0)
          );
        },
        message: "Industry array must contain at least one non-empty string",
      },
    },
    linkedinLink: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || /^https:\/\/(www\.)?linkedin\.com\/.*$/.test(v);
        },
        message: "LinkedIn link must be a valid LinkedIn URL",
      },
    },
    topmateLink: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || /^https:\/\/(www\.)?topmate\.io\/.*$/.test(v);
        },
        message: "Topmate link must be a valid Topmate URL",
      },
    },
    active: {
      type: Boolean,
      default: false,
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mentor", mentorSchema);
