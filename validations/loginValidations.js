const { body} = require("express-validator");

exports.loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email must be string"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be string"),
];
