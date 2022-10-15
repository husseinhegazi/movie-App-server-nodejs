const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const errorMW = require("../MW/validationsErrMW");
const { loginValidation } = require("../validations/loginValidations");
const authMW = require("../MW/authMW");

router
  .route("/login")

  .post(loginValidation, errorMW, loginController.login);

router.route("/logout").get(authMW,loginController.logout);

module.exports = router;
