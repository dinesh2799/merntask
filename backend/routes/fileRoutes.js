const express = require("express");
const router = express.Router();

// const {getPosts,setPost,updatePost,deletePost} = require('../controllers/postController')


const {protect} = require('../middleware/authMiddleware')

// router.route('/').get(protect,getPosts).post(protect,setPost)
// router.route('/:id').delete(protect,deletePost).put(protect,updatePost)
// module.exports = router 

const {upload, getListFiles,download} = require('../controllers/fileController')
router.route('/upload/:id').post(protect,upload)
router.route('/files').get(getListFiles)
router.route('/files/:name').get(download)
// const controller = require("../controller/file.controller");
// let routes = (app) => {
//   router.post("/upload", controller.upload);
//   router.get("/files", controller.getListFiles);
//   router.get("/files/:name", controller.download);
//   app.use(router);
// };
module.exports = router;