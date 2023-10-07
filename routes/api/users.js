const express = require("express");
const {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
} = require("../../controllers/user");
const { authenticate } = require("../../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, getCurrent);
router.patch("/", authenticate, updateSubscription);

module.exports = router;
