// app_api/app.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("./models/user"); // register model
require("./models/trip"); // register Trip model

const apiRouter = require("./routes");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/travlr";

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.status(200).send("API is running"));

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found", url: req.originalUrl });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected:", MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log("Trips: /api/trips");
      console.log("Auth: /api/auth");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

module.exports = app;