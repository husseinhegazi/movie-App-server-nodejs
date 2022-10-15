const express = require("express");
const router = express.Router();
const errorMW = require("../MW/validationsErrMW");
const authMW = require("../MW/authMW");
const categoryController = require("../controllers/categoryController");
const {
addCategoryValidation,
updateCategoryValidation,
getAndDeleteCategoryValid,
getCategoryByName
} = require("../validations/categoryValidations");

//create new category
router
  .route("/add-category")
  .post(
    authMW,
    categoryController.checkAuth,
    addCategoryValidation,
    errorMW,
    categoryController.createNewCategory
  );

//list of all category
router
  .route("/categories")
  .get(authMW, categoryController.checkAuth, categoryController.getAllCategories);

//update and delete category
router
  .route("/category/:id")
  .all(authMW, categoryController.checkAuth)
  .get(getAndDeleteCategoryValid, errorMW, categoryController.getcategoryById)
  .put(updateCategoryValidation, errorMW, categoryController.updateCategoryById)
  .delete(getAndDeleteCategoryValid, errorMW, categoryController.deleteCategoryById);

//filter by name
router
  .route("/category-title/:categoryTitle")
  .get(
    authMW,
    categoryController.checkAuth,
    getCategoryByName,
    errorMW,
    categoryController.getCategoryByname
  );

module.exports = router;