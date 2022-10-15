const { body, param, check } = require("express-validator");
const User = require("../models/userSchema");

// add user
exports.addUserValidation = [
  body("name")
    .notEmpty()
    .withMessage(" user first name is required")
    .isString()
    .withMessage(" user first name must be string")
    .isLength({ max: 30, min: 2 })
    .withMessage(
      "user first name must be less than 30 characters and geater than 2"
    ),
  body("email")
    .notEmpty()
    .withMessage("user email is required")
    .trim()
    .isEmail()
    .withMessage("user email must be valid")
    .isLength({ max: 50 })
    .withMessage("email must be max 40 long"),
  check("email").custom(async (value) => {
    return await User.findOne({ email: value }).then((user) => {
      if (user) {
        // console.log("user", user);
        return Promise.reject("E-mail already in use");
      }
    });
  }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password is too weak. Field must be greater than 8 characters, 1 number, 1 lowercase, 1 uppercase character and a symbol"
    ),
  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isString()
    .withMessage("date of birth must be in string"),
];

//update user
exports.updateUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("ID is required in params")
    .isNumeric()
    .withMessage("ID must be a number"),
  body("name")
    .optional()
    .isString()
    .withMessage(" user first name must be string")
    .isLength({ max: 30, min: 2 })
    .withMessage(
      "user first name must be less than 30 characters and geater than 2"
    ),
  body("email")
    .optional()
    .isEmail()
    .withMessage("user email must be valid")
    .isLength({ max: 50 })
    .withMessage("email must be max 40 long"),
  check("email").custom(async (value) => {
    return await User.findOne({ email: value }).then((user) => {
      if (user) {
        // console.log("user", user);
        return Promise.reject("E-mail already in use");
      }
    });
  }),
];

//get and delete user by ID
exports.getAndDeleteUserValid = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isNumeric()
    .withMessage("ID must be a number"),
];

//change password
exports.changePassValid = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isNumeric()
    .withMessage("ID must be a number"),
  body("newPassword")
    .notEmpty()
    .withMessage("new password is required")
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "new password is too weak. Field must be greater than 8 characters, 1 number, 1 lowercase, 1 uppercase character and a symbol"
    ),
];
