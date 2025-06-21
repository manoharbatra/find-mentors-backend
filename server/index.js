const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const { MONGO_URL } = process.env;

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/mentors", require("./routes/mentors"));

const server = app.listen(PORT, () => {
  console.log(process.env);
  console.log("the mongo url", process.env.MONGO_URL);
  console.log(`🚀 Server listening on port ${PORT} (::1)`);
});
