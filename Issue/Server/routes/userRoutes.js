const express = require('express');
const userController = require("../controller/userContoller");
const router = express.Router();

router.post("/signup", userController.SignUp);
router.post("/:uid/verify-email", userController.verifyEmail);
router.post("/login", userController.logIn);

module.exports = router;
