// app_api/routes/trips.js
const express = require("express");
const router = express.Router();

const ctrlTrips = require("../controllers/trips");
const auth = require("../middleware/auth");

// All protected
router.get("/", auth, ctrlTrips.tripsList);
router.post("/", auth, ctrlTrips.tripsAddTrip);
router.get("/:tripCode", auth, ctrlTrips.tripsFindByCode);
router.put("/:tripCode", auth, ctrlTrips.tripsUpdateTrip);
router.delete("/:tripCode", auth, ctrlTrips.tripsDeleteTrip);

module.exports = router;