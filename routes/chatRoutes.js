const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",protect,accessChat);
router.get("/",protect,fetchChats);
router.post("/group",protect, createGroupChat);
router.post("/rename",protect, renameGroup);
router.post("/groupremove",protect, removeFromGroup);
router.post("/groupadd",protect,addToGroup);

module.exports = router;

