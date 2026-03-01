// app_api/models/trips.js
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    length: { type: String },
    start: { type: Date },
    resort: { type: String },
    perPerson: { type: Number },
    image: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

// Register model name exactly as "Trip"
mongoose.model("Trip", tripSchema);