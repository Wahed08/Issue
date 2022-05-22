const express = require("express");
const postController = require("../controller/postController");
const router = express.Router();
const {auth, admin} = require("../context/authentication");


router.post("/create",auth, postController.createPost);
router.get("/", postController.getAllPost);
router.get("/admin/issues-list", [auth, admin], postController.getAllPost);


module.exports = router;
