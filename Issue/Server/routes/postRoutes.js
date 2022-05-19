const express = require("express");
const postController = require("../controller/postController");
const router = express.Router();
const {auth, admin} = require("../context/authentication");


router.post("/create", [auth, admin], postController.createPost);
router.get("/", postController.getAllPost);


module.exports = router;
