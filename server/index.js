const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const mentorValidationRules = require("./middleware/mentorValidation");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL);
mongoose.connection.on("connected", () =>
  console.log("✅ Connected to MongoDB")
);
mongoose.connection.on("error", (err) =>
  console.error("❌ MongoDB connection error:", err)
);

const allowedOrigins = ["https://mb-mentors.netlify.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    optionsSuccessStatus: 200,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("Server is up ✅");
});

app.use("/api/mentors", mentorValidationRules, require("./routes/mentors"));

app.use((req, res, next) => {
  if (!["GET", "POST", "PUT", "DELETE"].includes(req.method)) {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  next();
});

app.use((err, req, res, next) => {
  console.error("❌ Internal Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
