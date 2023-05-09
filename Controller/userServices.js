const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const handler = require("./handlerFactory");

// @desc Get User Profile
// @route Get /api/v1/user/myProfile
// @access Private/Protect
exports.getProfile = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});


exports.specificUser = handler.getSpecificOne(userModel, "User");
