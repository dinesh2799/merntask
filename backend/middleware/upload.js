const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
var path = require('path')


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/images');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    // console.log(path.extname(req.originalname))
    // cb(null, file.originalname);
    cb(null,  req.params.id + path.extname(file.originalname));
  },
});
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;