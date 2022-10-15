const express = require("express");
const router = express.Router();
const errorMW = require("../MW/validationsErrMW");
const authMW = require("../MW/authMW");
const movieController = require("../controllers/movieController");
const {
  addMovieValidation,
  updateMovieValidation,
  deleteAndGetValid,
  categoryValidation,
  rateValidation,
  titleValidation,
} = require("../validations/movieValidations");

//create new movie
router
  .route("/add-movie")
  .post(
    authMW,
    movieController.checkAuth,
    addMovieValidation,
    errorMW,
    movieController.createNewMovie
  );

//list of all movies
router
  .route("/movies")
  .get(authMW, movieController.checkAuth, movieController.getAllMovies);

//update and delete movie
router
  .route("/movie/:id")
  .all(authMW, movieController.checkAuth)
  .get(deleteAndGetValid, errorMW, movieController.getMovieById)
  .put(updateMovieValidation, errorMW, movieController.updateMovieById)
  .delete(deleteAndGetValid, errorMW, movieController.deleteMovieById);

//filters
router
  .route("/movies-rates/:rate")
  .get(
    authMW,
    movieController.checkAuth,
    rateValidation,
    errorMW,
    movieController.filterMovieByRate
  );
router
  .route("/movies-category/:category")
  .get(
    authMW,
    movieController.checkAuth,
    categoryValidation,
    errorMW,
    movieController.filterMovieBycategory
  );
router
  .route("/movies-search/:title")
  .get(
    authMW,
    movieController.checkAuth,
    titleValidation,
    errorMW,
    movieController.filterMovieByTitle
  );
module.exports = router;
