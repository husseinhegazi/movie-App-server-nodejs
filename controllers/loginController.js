const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");

//user login
module.exports.login = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })

    .then((user) => {
      if (user) {
        bycrypt
          .compare(req.body.password, user.password)
          .then((isEqual) => {
            if (!isEqual) {
              res.status(401).json({ user: "invalid email or password" });
            } else {
              let token = jwt.sign(
                {
                  id: user._id,
                  role: user.role,
                },
                process.env.secret,
                { expiresIn: "1d" }
              );

              res
                .cookie("access_token", token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "protected",
                })
                .status(200)
                .json({ token });
            }
          })
          .catch((error) => {
            next(error);
          });
      } else {
        res.status(401).json({ user: "invalid email or password" });
      }
    })
    .catch((error) => next(error));
};
