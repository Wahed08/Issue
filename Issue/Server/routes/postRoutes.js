const express = require("express");
const postController = require("../controller/postController");
const router = express.Router();
const {auth, admin} = require("../context/authentication");


router.post("/create",auth, postController.createIssue);
router.get("/", auth, postController.getAllIssue);
router.get("/admin/issues-list", [auth, admin], postController.getAllIssue);
router.patch("/admin/:pid/edit-issue",[auth,admin], postController.updateIssue);
router.delete("/admin/:pid/delete-issue",[auth,admin], postController.deleteIssue);
router.get("/:pid/issue-details",auth, postController.getIssueDetails);
router.patch("/:pid/edit-issue",auth, postController.editIssue);


module.exports = router;
