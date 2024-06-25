const express = require("express");
const router = express.Router();

const genreController = require("../controller/genre");

router.route("/").get(genreController.getGenres).post(genreController.addGenre);
router
  .route("/:id")
  .get(genreController.getGenrebyId)
  .put(genreController.updateGenre)
  .delete(genreController.deleteGenre);

module.exports = router;
