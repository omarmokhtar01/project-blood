const express = require("express");

const {
  getAllHospitals,
  createHospital
} = require("../Controller/hospitalServices");

const router = express.Router();

router.get("/", getAllHospitals);
router.post("/create-hospital", createHospital);

module.exports = router;
