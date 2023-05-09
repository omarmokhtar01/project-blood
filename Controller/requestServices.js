const requestsModel = require("../models/requestsModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// @desc Create Reservation to Donate
// @route Post /api/v1/requests
// @access Protected(user)
exports.createReservationDonateRequest = asyncHandler(
  async (req, res, next) => {
    const donate = await (await requestsModel.create({ userId: req.user._id, hospitalId: req.params.hospitalId, details: req.body.details })).populate({ path: 'hospitalId', select: '-id -updatedAt -__v' })
    res.status(201).json({ data: donate });
  }
);

// @desc Get All Requests Donate
// @route Post /api/v1/requests/allResults
// @access Protected(user)
exports.getAllDonationRequest = asyncHandler(async (req, res, next) => {
  const donate = await requestsModel.find({ userId: req.user._id }).populate({ path: 'hospitalId' });
  if (!donate) {
    return next(new ApiError(404, "You do not have a Requests"));
  }
  res.status(200).json({ data: donate });
});

// @desc Get All Requests Donate
// @route Post /api/v1/requests/update-request/:idReq
// @access Protected(admin)
exports.updateOneRequest = asyncHandler(async (req, res, next) => {
  const { donate_status } = req.body;
  const id = req.params.requestId
  const donate = await requestsModel.findByIdAndUpdate(id, { donate_status }, { new: true });
  console.log(id);
  if (!donate) {
    return next(new ApiError(404, `You do not have a Requests by this id: ${id}`));
  }
  res.status(200).json({ data: donate });
});