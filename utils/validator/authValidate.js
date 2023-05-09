const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const userModel = require("../../models/userModel");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.ruleSignUpValidator = [
  // Check Name
  check("name")
    .notEmpty()
    .withMessage("Should Not Empty")
    .isString()
    .withMessage("Should be String")
    .isLength({ min: 3, max: 32 })
    .withMessage("Invalid Length Name between 3 , 32 charactar"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  // Check Email
  check("email")
    .notEmpty()
    .withMessage("Email Should Not Empty")
    .isEmail()
    .withMessage("Input should be Email")
    .custom((value) => {
      return userModel.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),
  // Check Password
  check("password")
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 6 }),
  // Check Phone
  check("phone")
    .notEmpty()
    .withMessage("phone is Required")
    .isMobilePhone("ar-EG")
    .withMessage("Please enter egyptian number"),
  // Check nationalID
  check("nationalID")
    .notEmpty()
    .withMessage("National ID is Required")
    .isString()
    .isLength({ min: 14, max: 14 })
    .withMessage("Please enter valid national ID"),
  // location
  check("location")
    .notEmpty()
    .withMessage("location is Required")
    .isString()
    .isLength({ min: 3, max: 32 })
    .withMessage("location should be String"),
  // birthDate
  check("birthDate")
    .notEmpty()
    .withMessage('birthday Should Not Empty')
    .isISO8601()
    .toDate()
    .withMessage("birthday should be Date yy-mm-dd"),
  // bloodType
  check("bloodType")
    .notEmpty()
    .withMessage('BloodType Should Not Empty')
    .isString()
    .withMessage("BloodType should be String").custom((val) => {
      let arr = ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-", "لا أعلم"];
      if (!arr.includes(val)) {
        return Promise.reject('Data Should be from "AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-", "لا أعلم"')
      }
      return true;
    }),

  validatorMiddleware,
];

exports.ruleLoginValidator = [
  // Check Email
  check("email")
    .notEmpty()
    .withMessage("Email Should Not Empty")
    .isEmail()
    .withMessage("Input should be Email"),
  // Check Password
  check("password")
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 6 }),
  validatorMiddleware,
];