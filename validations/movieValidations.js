const { body, param, check } = require("express-validator");
const Movie = require("../models/movieSchema");
const Category = require("../models/categorySchema");

//create movie
exports.addMovieValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage(" movie title is required")
    .isString()
    .withMessage(" movie title must be string"),
  check("title").custom(async (value) => {
    return await Movie.findOne({ title: value }).then((movie) => {
      if (movie) {
        return Promise.reject("This movie is already added");
      }
    });
  }),
  body("description")
    .notEmpty()
    .withMessage("movie description is required")
    .isString()
    .withMessage("movie description must be string"),
  body("rate")
    .notEmpty()
    .withMessage("rate is required")
    .isNumeric()
    .withMessage("rate must be a number")
    .isFloat({ gt: -1, lt: 11 })
    .withMessage("rate must be between 1 and 10"),
  body("category")
    .notEmpty()
    .withMessage("category is required")
    .isNumeric()
    .withMessage("category must be number"),
];
//update movie
exports.updateMovieValidation = [
  body("title")
    .trim()
    .optional()
    .isString()
    .withMessage(" movie title must be string"),
  check("title").custom(async (value) => {
    return await Movie.findOne({ title: value }).then((movie) => {
      if (movie) {
        return Promise.reject("This movie is already added");
      }
    });
  }),
  body("description")
    .optional()
    .isString()
    .withMessage("description title must be string"),
  body("rate")
    .optional()
    .isNumeric()
    .withMessage("rate must be a number")
    .isFloat({ gt: -1, lt: 11 })
    .withMessage("rate must be between 1 and 10"),
  body("category")
    .optional()
    .isNumeric()
    .withMessage("category must be number"),
  check("category").custom(async (value) => {
    return await Category.findOne({ _id: value }).then((category) => {
      if (!category) {
        return Promise.reject("can't update category by this ID not found");
      }
    });
  }),
];
//delete & get by id
exports.deleteAndGetValid = [
  param("id").isNumeric().withMessage("movie id must be a number"),
];
//filters
exports.rateValidation = [
  param("rate").isNumeric().withMessage("rate must be a number"),
];
exports.categoryValidation = [
  param("category").isString().withMessage("category must be a string"),
];
exports.titleValidation = [
  param("title").isString().withMessage("title must be string"),
];
