const { check } = require("express-validator");
const userModel = require("../../models/userModel");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.ruleSignUpValidator = [
  // Check Email
  check("email")
    .notEmpty()
    .withMessage("Email Should Not Empty")
    .isEmail()
    .withMessage("Input should be Email")
    .custom((value) => {
      return userModel.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("يوجد حساب بالبريد الإلكتروني, الرجاء تسجيل الدخول");
        }
      });
    }),
  // Check Password
  check("password")
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 6 })
    .withMessage("لا تقل كلمة السر عن ستة أحرف")
  ,
  // Check Phone
  check("phone")
    .notEmpty()
    .withMessage("phone is Required")
    .isMobilePhone("ar-EG")
    .withMessage("يجب ادخال رقم مصري"),
  // Check nationalID
  check("nationalID")
    .notEmpty()
    .withMessage("National ID is Required")
    .isString()
    .isLength({ min: 14, max: 14 })
    .withMessage("يجب ادخال رقم قومى صحيح"),
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
