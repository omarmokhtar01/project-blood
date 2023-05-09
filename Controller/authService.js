const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");
const ApiError = require("../utils/apiError");
const generateToken = require("../utils/createToken");
const {
  sanitizeUserLogin,
  sanitizeUserSignup,
} = require("../utils/sanitizeData");

// @desc create new user
// @route Post /api/v1/auth/signup
// access Public
exports.signup = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    nationalID,
    bloodType,
    birthDate,
    location,
  } = req.body;
  const user = await userModel.create({
    name,
    email,
    password,
    phone,
    nationalID,
    bloodType,
    birthDate,
    location,
  });
  // Generate Token
  const token = generateToken(user._id);
  // Generate Cookie
  res.status(201).json({ data: sanitizeUserSignup(user), token });
});

// @desc login
// @route Post /api/v1/auth/login
// access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError(401, "Incorrect email or password"));
  }
  const token = generateToken(user._id);
  res.status(200).json({ data: sanitizeUserLogin(user), token });
});

// @desc check about token verify & login
exports.authProtect = asyncHandler(async (req, res, next) => {
  // 1) Check if get token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }
  if (!token) {
    new ApiError(401, "Please Login first to access this route");
  }
  // 2) verify token (no changes , expired)
  const decode = jwt.verify(token, process.env.PRIVATEKEY);
  // 3) if user existis
  const currentUser = await userModel.findById(decode.userID);
  if (!currentUser) {
    new ApiError(401, " user for this token is not existis");
  }
  // 4) check is user is change password after token is created
  if (currentUser.passwordChangeAt) {
    // decode.iat: is time make token (time stamp)
    let passChangeTimeStamp = parseInt(
      currentUser.passwordChangeAt.getTime() / 1000,
      10 /*Base 10*/
    );
    // password is changed
    if (passChangeTimeStamp > decode.iat) {
      next(new ApiError(401, "user is change password, please login again"));
    }
  }
  // to can access user in future
  req.user = currentUser;
  next();
});

// @desc to check how can access to specific routes
// @desc    Authorization (User Permissions)
// ["admin", "manager"]
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });