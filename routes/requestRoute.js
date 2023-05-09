const express = require("express");

const {
  createReservationDonateRequest,
  getAllDonationRequest,
  updateOneRequest
} = require("../Controller/requestServices");
const { authProtect, allowedTo } = require("../Controller/authService");

const router = express.Router();
router.put('/:requestId', updateOneRequest);

router.use(authProtect, allowedTo("user"));
router.post("/:hospitalId", createReservationDonateRequest);
router.get("/allResults", getAllDonationRequest);

module.exports = router;
