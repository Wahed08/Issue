const express = require('express');
const userController = require("../controller/userContoller");
const router = express.Router();

router.post("/signup", userController.SignUp);
router.post("/:uid/verify-email", userController.VerifyEmail);
router.post("/login", userController.LogIn);
router.post("/:uid/update-profile", userController.UpdateUserProfile);
router.get("/:uid/profile", userController.getProfile);

module.exports = router;
