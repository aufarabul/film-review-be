const express = require("express");
const router = express.Router();

const filmController = require("../controller/film");

router.route("/").get(filmController.getFilms).post(filmController.addFilm);
router
  .route("/:id")
  .get(filmController.getFilmbyId)
  .put(filmController.updateFilm)
  .delete(filmController.deleteFilm);

module.exports = router;
