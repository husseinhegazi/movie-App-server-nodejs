const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  addUserValidation,
  updateUserValidation,
  getAndDeleteUserValid,
  changePassValid,
} = require("../validations/userValidations");
const errorMW = require("../MW/validationsErrMW");
const authMW = require("../MW/authMW");

//user sign-up route
router
  .route("/user/signup")
  .post(
    addUserValidation,
    userController.confirmPassword,
    errorMW,
    userController.createNewUser
  );

//find all users route
router
  .route("/users")
  .get(authMW, userController.checkUserAuth, userController.getAllUsers);

//user by ID route
router
  .route("/user/:id")
  .all(authMW, userController.checkUserAuthById)
  .get(getAndDeleteUserValid, errorMW, userController.getUserById)
  .put(updateUserValidation, errorMW, userController.updateUserById)
  .delete(getAndDeleteUserValid, errorMW, userController.deleteUserById);

//change password route
router
  .route("/user/change-password/:id")
  .put(
    authMW,
    userController.checkUserAuthById,
    changePassValid,
    userController.confirmPassword,
    errorMW,
    userController.userChangePassword
  );

module.exports = router;
