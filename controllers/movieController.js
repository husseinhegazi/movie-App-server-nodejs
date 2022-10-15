const Movie = require("../models/movieSchema");
const Category = require("../models/categorySchema");

// find all movies
module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .populate({
      path: "category",
      select: {
        _id: 0,
        categoryTitle: 1,
      },
    })
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((error) => {
      next(error);
    });
};

//find movie by ID
module.exports.getMovieById = (req, res, next) => {
  Movie.findOne({ _id: req.params.id })
    .populate({
      path: "category",
      select: {
        _id: 0,
        categoryTitle: 1,
      },
    })
    .then((movie) => {
      if (movie) {
        res.status(200).json({ data: movie });
      } else {
        throw new Error("movie Not Found!");
      }
    })
    .catch((error) => {
      next(error);
    });
};

//create new movie
module.exports.createNewMovie = (req, res, next) => {
  let path = "";
  if (req.file) {
    path = `${process.env.BASE_URL}/movies/${req.file.filename}`;
  } else {
    path = "https://www.w3schools.com/howto/img_avatar.png";
  }
  let MovieObj = new Movie({
    title: req.body.title,
    description: req.body.description,
    rate: req.body.rate,
    image: path,
    category: req.body.category,
  });
  Category.findOne({ _id: req.body.category })
    .then((category) => {
      if (category) {
        MovieObj.save()
          .then((movie) => {
            res.status(201).json({ data: movie });
          })
          .catch((error) => {
            next(error);
          });
      } else {
        throw new Error("category ID is not found");
      }
    })
    .catch((error) => next(error));
};

//update movie by ID
module.exports.updateMovieById = (req, res, next) => {
  Movie.findOne({ _id: req.params.id })
    .then((movie) => {
      if (movie) {
        let bodyData = req.body;
        if (req.file) {
          movie.image = `${process.env.BASE_URL}/movies/${req.file.filename}`;
        }
        for (let key in bodyData) {
          if (req.body._id) {
            throw new Error("can't update ID");
          }
          else movie[key] = bodyData[key];
        }
        return movie.save().then(res.status(200).json({ data: movie }));
      } else {
        throw new Error("movie not found");
      }
    })
    .catch((error) => {
      next(error);
    });
};

//delete movie
module.exports.deleteMovieById = (req, res, next) => {
  Movie.deleteOne({ _id: req.params.id })
    .then((movie) => {
      if (movie.deletedCount === 0) next(new Error("movie not found"));
      else res.status(200).json({ data: "deleted" });
    })
    .catch((error) => {
      next(error);
    });
};

//filer movies by rate
module.exports.filterMovieByRate = (req, res, next) => {
  Movie.find({ rate: req.params.rate })
    .populate({
      path: "category",
      select: {
        _id: 0,
        categoryTitle: 1,
      },
    })
    .then((movies) => {
      if (movies.length !== 0) res.status(200).json(movies);
      else throw new Error("no movies found");
    })
    .catch((error) => next(error));
};
//filter movies by category
module.exports.filterMovieBycategory = (req, res, next) => {
  Movie.find({ category: req.params.category })
    .populate({
      path: "category",
      select: {
        _id: 0,
        categoryTitle: 1,
      },
    })
    .then((movies) => {
      if (movies.length !== 0) res.status(200).json(movies);
      else throw new Error("no movies found");
    })
    .catch((error) => next(error));
};
//filter movies by title
module.exports.filterMovieByTitle = (req, res, next) => {
  Movie.find({ title: { $regex: req.params.title, $options: "i" } })
    .populate({
      path: "category",
      select: {
        _id: 0,
        categoryTitle: 1,
      },
    })
    .then((movies) => {
      if (movies.length !== 0) res.status(200).json(movies);
      else throw new Error("no movies found");
    })
    .catch((error) => {
      next(error);
    });
};

//check auth module
module.exports.checkAuth = (req, res, next) => {
  if (req.role === "user") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};
