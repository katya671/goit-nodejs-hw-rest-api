const express = require("express");

const router = express.Router();

const {
  getAll,
  getById,
  add,
  remove,
  update,
  updateStatusContact,
} = require("../../controller/index");

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", add);

router.delete("/:contactId", remove);

router.put("/:contactId", update);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
