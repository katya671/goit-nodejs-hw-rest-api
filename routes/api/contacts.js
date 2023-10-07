const express = require("express");
const {
  getAll,
  getById,
  add,
  remove,
  update,
  updateStatusContact,
} = require("../../controllers/contact");
const { authenticate } = require("../../middlewares/auth");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, getById);

router.post("/", authenticate, add);

router.delete("/:contactId", authenticate, remove);

router.put("/:contactId", authenticate, update);

router.patch("/:contactId/favorite", authenticate, updateStatusContact);

module.exports = router;
