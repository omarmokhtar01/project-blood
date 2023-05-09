const express = require("express");

const {
  specificUser,
  getProfile,
} = require("../Controller/userServices");

const { authProtect, allowedTo } = require("../Controller/authService");

const router = express.Router();

// User
router.use(authProtect, allowedTo('user'));
router
  .route("/myProfile")
  .get(getProfile, specificUser)

module.exports = router;
