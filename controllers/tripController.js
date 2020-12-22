const { Trip } = require("../db/models");

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findByPk(tripId);
    return trip;
  } catch (error) {
    next(error);
  }
};

exports.tripList = async (req, res, next) => {
  try {
    const trips = await Trip.findAll();
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

exports.tripCreate = async (req, res, next) => {
  try {
    console.log(req.file);
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};

exports.tripDelete = async (req, res, next) => {
  try {
    await req.trip.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.tripUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.trip.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
