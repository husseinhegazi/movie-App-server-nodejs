//image upload
const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image of type jpg, jpeg or png"));
    }
    cb(undefined, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./movies");
    },
    filename: function (req, file, callback) {
      const newImageName = `${Date.now()}-${file.originalname}`;
      callback(null, newImageName);
    },
  }),
});

exports.upload = upload;
