const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const moment = require("moment");

// confirm password for user
module.exports.confirmPassword = (req, res, next) => {
  if (
    (req.body.password || req.body.newPassword) !== req.body.confirmPassword
  ) {
    let error = new Error("Passwords do not match.");
    error.status = 400;
    return next(error);
  } else {
    next();
  }
};

// find all users
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      next(error);
    });
};

// find user by ID
module.exports.getUserById = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user) {
        res.status(200).json({ data: user });
      } else {
        throw new Error("User Not Found!");
      }
    })
    .catch((error) => {
      next(error);
    });
};

//create new user
module.exports.createNewUser = (req, res, next) => {
  let date = req.body.dateOfBirth;
  bcrypt
    .hash(req.body.password, parseInt(process.env.SALT))
    .then((hashpass) => {
      let UserObj = new User({
        name: req.body.name,
        email: req.body.email,
        dateOfBirth: moment(
          new Date(date),
          moment.ISO_8601,
          "DD/MM/YYYY"
        ).format("DD/MMM/YYYY"),
        password: hashpass,
      });
      if (moment(date).isValid()) {
        UserObj.save()
          .then((user) => {
            res.status(201).json({ data: user });
          })
          .catch((error) => {
            next(error);
          });
      } else {
        let error = new Error("invalid Date");
        next(error);
      }
    });
};

//update user by ID
module.exports.updateUserById = (req, res, next) => {
  User.updateOne(
    { _id: req.params.id },
    {
      name: req.body.name,
      email: req.body.email,
    }
  )
    .then((user) => {
      if (user.modifiedCount === 0)
        next(new Error("nothing to update in user or user not found"));
      else if (req.body.password || req.body.dateOfBirth) {
        next(new Error("invalid key for update"));
      } else res.status(200).json({ data: user });
    })
    .catch((error) => {
      next(error);
    });
};

// change password
module.exports.userChangePassword = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.oldPassword, user.password).then((isEqual) => {
          if (!isEqual) {
            res.status(401).json({ user: "wrong password" });
          } else {
            bcrypt
              .hash(req.body.newPassword, parseInt(process.env.SALT))
              .then((hashpass) => {
                user.password = hashpass;
                return user.save().then(res.status(200).json({ data: user }));
              });
          }
        });
      } else {
        res.status(401).json({ message: "user not found" });
      }
    })
    .catch((error) => {
      next(error);
    });
};

//delete user by ID
module.exports.deleteUserById = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then((data) => {
      if (data.deletedCount === 0) next(new Error("user not found"));
      else res.status(200).json({ data: "deleted" });
    })
    .catch((error) => {
      next(error);
    });
};

//check user auth module
module.exports.checkUserAuth = (req, res, next) => {
  if (req.role === "user") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};
//check user auth by ID
module.exports.checkUserAuthById = (req, res, next) => {
  if (req.role === "user" && req.id == req.params.id) {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};
