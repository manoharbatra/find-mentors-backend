// validators/mentorValidator.js

const { body } = require("express-validator");

const mentorValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be 2 to 100 characters long"),

  body("designation").trim().notEmpty().withMessage("Designation is required"),

  body("domain").trim().notEmpty().withMessage("Domain is required"),

  body("expertise").trim().notEmpty().withMessage("Expertise is required"),

  body("yoe")
    .notEmpty()
    .withMessage("Years of experience is required")
    .matches(/^\d+(\+)?$/)
    .withMessage("YOE must be a number or with '+' suffix (e.g. '3+' or '5')"),

  body("skills")
    .isArray({ min: 1 })
    .withMessage("Skills must be a non-empty array")
    .custom((arr) =>
      arr.every((skill) => typeof skill === "string" && skill.trim() !== "")
    )
    .withMessage("Each skill must be a non-empty string"),

  body("companies")
    .isArray({ min: 1 })
    .withMessage("Companies must be a non-empty array")
    .custom((arr) =>
      arr.every(
        (company) => typeof company === "string" && company.trim() !== ""
      )
    )
    .withMessage("Each company must be a non-empty string"),

  body("industry")
    .isArray({ min: 1 })
    .withMessage("Industry must be a non-empty array")
    .custom((arr) =>
      arr.every((ind) => typeof ind === "string" && ind.trim() !== "")
    )
    .withMessage("Each industry must be a non-empty string"),

  body("linkedinLink")
    .optional()
    .isURL()
    .withMessage("LinkedIn link must be a valid URL")
    .matches(/^https:\/\/(www\.)?linkedin\.com\/.*$/)
    .withMessage("Must be a LinkedIn URL"),

  body("topmateLink")
    .optional()
    .isURL()
    .withMessage("Topmate link must be a valid URL")
    .matches(/^https:\/\/(www\.)?topmate\.io\/.*$/)
    .withMessage("Must be a Topmate URL"),

  body("active")
    .not()
    .exists()
    .withMessage("You cannot manually set the 'active' field"),
];

module.exports = mentorValidationRules;
