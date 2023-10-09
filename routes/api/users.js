const express = require("express");
const {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/user");
const { authenticate } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/upload");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, getCurrent);
router.patch("/", authenticate, updateSubscription);
router.patch("/avatar", authenticate, upload.single("picture"), updateAvatar);

module.exports = router;
