const express = require("express");
const router = express.Router();

const {
  fetchTrip,
  tripDelete,
  tripCreate,
  tripList,
  tripUpdate,
} = require("../controllers/tripController");
//multer middleware for uploading an image as file
const upload = require("../middleware/multer");

// trips List
router.get("/", tripList);
// create trip
router.post("/", upload.single("image"), tripCreate);
// fetchTrips
router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const err = new Error("Sorry Trip Not Found");
    err.status = 404;
    next(err);
  }
});
// delete trip
router.delete("/:tripId", tripDelete);
// update trip
router.put("/:tripId", upload.single("image"), tripUpdate);
module.exports = router;
