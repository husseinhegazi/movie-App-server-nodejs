const { body, param, check } = require("express-validator");
const Category = require("../models/categorySchema");

exports.addCategoryValidation = [
  body("categoryTitle")
    .trim()
    .notEmpty()
    .withMessage(" category title is required")
    .isString()
    .withMessage(" category title must be string")
    .isLength({ min: 1 })
    .withMessage("category title minimum length is 1"),
  check("categoryTitle").custom(async (value) => {
    return await Category.findOne({ categoryTitle: value }).then((category) => {
      if (category) {
        return Promise.reject("This category is already added");
      }
    });
  }),
];

exports.updateCategoryValidation = [
  body("categoryTitle")
    .trim()
    .notEmpty()
    .withMessage(" category title is required")
    .isString()
    .withMessage(" category title must be string")
    .isLength({ min: 1 })
    .withMessage("category title minimum length is 1"),
  check("categoryTitle").custom(async (value) => {
    return await Category.findOne({ categoryTitle: value }).then((category) => {
      if (category) {
        return Promise.reject("This category is already added");
      }
    });
  }),
  param("id").isNumeric().withMessage("ID must be number"),
];

exports.getAndDeleteCategoryValid = [
  param("id").isNumeric().withMessage("ID must be number"),
];
exports.getCategoryByName = [
  param("categoryTitle")
    .isString()
    .withMessage("category title must be string"),
];
