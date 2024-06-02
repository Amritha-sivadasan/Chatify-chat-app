const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {accessChat, fetchChats, createGroupChat, renameGroup, addTogroup, removeFromGroup} = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect,fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupAdd").put(protect, addTogroup);
router.route("/groupRemove").put(protect, removeFromGroup);

module.exports = router;
