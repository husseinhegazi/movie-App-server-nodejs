const express = require("express");
const server = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
//import multer mw
const myMulter = require("./MW/imageMW");
//import routes
const userRoute = require("./routes/userRoute");
const loginRoute = require("./routes/loginRoute");
const movieRoute = require("./routes/movieRoute");
const categoryRoute = require("./routes/categoryRoute");


// DB connect
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database Connected");
    server.listen(process.env.port || 8080, () => {
      console.log("Server 8080 is listening");
    });
  })
  .catch((error) => {
    console.log("DataBase connection error" + error);
  });

//morgan middleWare
server.use(
  morgan("dev", {
    skip: (req, res) => {
      res.statusCode < 400;
    },
  })
);

// cors
server.use(cors({}));
server.use(cookieParser());

//endpoints Routes
server.use([
    express.json(),
    express.urlencoded({ extended: false }),
    myMulter.upload.single("image"),
  ]);
  server.use([
    userRoute,
    loginRoute,
    movieRoute,
    categoryRoute,
  ]);

server.use("/movies", express.static(path.join(__dirname, "movies")));

// not found middleWare
server.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
  });
  //error middleWare
  server.use((error, req, res, next) => {
    let status = error.status || 500;
    res.status(status).json({ message: "internal error " + error });
  });
