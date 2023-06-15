const express = require("express");
const {
  ruleSignUpValidator,
  ruleLoginValidator

} = require("../utils/validator/authValidate");

const {
  signup,
  login,

} = require("../Controller/authService");

const router = express.Router();

router.route("/signup").post(ruleSignUpValidator, signup);

router.route("/login").post(ruleLoginValidator, login);

module.exports = router;
