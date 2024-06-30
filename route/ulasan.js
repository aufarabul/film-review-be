const express = require("express");
const router = express.Router();

const UlasanController = require("../controller/ulasan");

router
  .route("/")
  .get(UlasanController.getUlasans)
  .post(UlasanController.addUlasan);
router
  .route("/:id")
  .get(UlasanController.getUlasanbyId)
  .put(UlasanController.updateUlasan)
  .delete(UlasanController.deleteUlasan);

module.exports = router;
