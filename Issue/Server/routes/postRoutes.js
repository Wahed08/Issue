const express = require("express");
const postController = require("../controller/postController");
const router = express.Router();

//post routes
router.post("/create", postController.createPost);
//get routes
router.get("/", postController.getAllPost);



module.exports = router;
