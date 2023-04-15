const multer = require("multer");
const path = require("path")
const publicPath = path.join(__dirname, "../resources");
const uploadPath = path.join(publicPath,"img");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

exports.multer = multer({ storage });