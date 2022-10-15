const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.cookies.access_token;
    let decoded = jwt.verify(token, process.env.secret);
    req.role = decoded.role;
    req.id = decoded.id;

    next();
  } catch (error) {
    error.message = "You are not authorized to access this resource.";
    error.status = 403;
    next(error);
  }
};
