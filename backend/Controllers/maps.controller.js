const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const address = req.query.address; // Extract the address string

  try {
    const coordinates = await mapService.getAddressCordinates(address);
    if (!coordinates) {
      return res
        .status(404)
        .json({ success: false, message: "Coordinates not found" });
    }
    res.status(200).json({ success: true, data: coordinates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getDistanceAndTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const origin = req.query.origin;
    const destination = req.query.destination;
    const result = await mapService.getDistanceAndTime(origin, destination);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const input = req.query.input; // Extract the input string

  try {
    const suggestions = await mapService.getAutoCompleteSuggestions(input);
    res.status(200).json({ success: true, data: suggestions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
