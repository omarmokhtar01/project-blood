const hospitalModel = require("../models/hospitalModel");
const handler = require("./handlerFactory");
const asyncHandler = require("express-async-handler");

// @desc Get All Hospitals
// @route Get /api/v1/hospital
// @access Public
exports.getAllHospitals = handler.getAll(hospitalModel, "Hospital");

// @desc Create Hospital Data
// @route Post /api/v1/create-hospital
// @access Public
exports.createHospital = asyncHandler(async (req, res, next) => {
    const hospital = await hospitalModel.create(req.body);
    res.status(201).json({
        success: true,
        data: hospital,
    });
});
