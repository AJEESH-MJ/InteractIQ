const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { create } = require("../models/userModel");
const { accessChat, fetchChats, CreateGroup, renameGroup, addMember, removeMember } = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, CreateGroup);
router.route("/rename").put(protect, renameGroup);
router.route("/add").put(protect, addMember);
router.route("/remove").put(protect, removeMember);
// router.route("/delete").delete(protect, deleteGroup);

module.exports = router;