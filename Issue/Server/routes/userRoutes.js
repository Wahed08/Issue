const express = require('express');
const userController = require("../controller/userContoller");
const router = express.Router();
const {admin, auth, normalUser} = require("../context/authentication");

router.post("/signup", userController.SignUp);
router.post("/:uid/verify-email", userController.VerifyEmail);
router.post("/login", userController.LogIn);
router.post("/:uid/update-profile", auth, userController.UpdateUserProfile);
router.get("/:uid/profile", auth, userController.getProfile);
router.get("/:uid/user", auth, userController.getUser);
router.get("/admin/users-list",[auth, admin], userController.getUsersAll);
router.delete("/admin/:uid/delete-user",[auth,admin], userController.deleteUser);

module.exports = router;
