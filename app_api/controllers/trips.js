// app_api/controllers/trips.js
const mongoose = require("mongoose");

// Make sure Trip model is registered
require("../models/trip");

const Trip = mongoose.model("Trip");

// GET /api/trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: "Error fetching trips", error: err });
  }
};

// POST /api/trips
const tripsAddTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ message: "Error creating trip", error: err });
  }
};

// GET /api/trips/:tripCode
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode }).exec();
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: "Error finding trip", error: err });
  }
};

// PUT /api/trips/:tripCode
const tripsUpdateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      req.body,
      { new: true, runValidators: true }
    ).exec();

    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.status(200).json(trip);
  } catch (err) {
    res.status(400).json({ message: "Error updating trip", error: err });
  }
};

// DELETE /api/trips/:tripCode
const tripsDeleteTrip = async (req, res) => {
  try {
    const result = await Trip.deleteOne({ code: req.params.tripCode }).exec();
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Error deleting trip", error: err });
  }
};

module.exports = {
  tripsList,
  tripsAddTrip,
  tripsFindByCode,
  tripsUpdateTrip,
  tripsDeleteTrip,
};