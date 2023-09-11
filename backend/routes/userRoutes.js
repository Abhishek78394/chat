const express = require("express");
const { registerUser, login, allUsers } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/",registerUser)
router.post("/login",login)
router.get("/",protect,allUsers)


module.exports = router;
