const Category = require("../models/categorySchema");

//find all categories
module.exports.getAllCategories = (req, res, next) => {
  Category.find({})
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((error) => {
      next(error);
    });
};
//find category by name
module.exports.getCategoryByname = (req, res, next) => {
  Category.find({ categoryTitle: req.params.categoryTitle })
    .then((categories) => {
      if (categories.length !== 0) res.status(200).json(categories);
      else throw new Error("no categories found");
    })
    .catch((error) => next(error));
};
//find category by ID
module.exports.getcategoryById = (req, res, next) => {
  Category.findOne({ _id: req.params.id })
    .then((category) => {
      if (category) {
        res.status(200).json({ data: category });
      } else {
        throw new Error("category Not Found!");
      }
    })
    .catch((error) => {
      next(error);
    });
};
//add new category
module.exports.createNewCategory = (req, res, next) => {
  let CategoryObj = new Category({
    categoryTitle: req.body.categoryTitle,
  });

  CategoryObj.save()
    .then((category) => {
      res.status(201).json({ data: category });
    })
    .catch((error) => {
      next(error);
    });
};
//update category
module.exports.updateCategoryById = (req, res, next) => {
  Category.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  )
    .then((category) => {
      if (category.modifiedCount === 0)
        next(new Error("nothing to update in category or category not found"));
      else res.status(200).json({ data: category });
    })
    .catch((error) => {
      next(error);
    });
};
//delete category
module.exports.deleteCategoryById = (req, res, next) => {
  Category.deleteOne({ _id: req.params.id })
    .then((data) => {
      if (data.deletedCount === 0) next(new Error("Category not found"));
      else res.status(200).json({ data: "deleted" });
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
