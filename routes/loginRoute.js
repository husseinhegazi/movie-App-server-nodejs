const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const errorMW = require("../MW/validationsErrMW");
const {loginValidation}=require("../validations/loginValidations")

router
  .route("/login")

  .post(loginValidation,errorMW,loginController.login);

module.exports = router;
