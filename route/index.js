const express = require("express");
const router = express.Router();

const film = require("./film");
const genre = require("./genre");
const ulasan = require("./ulasan");

router.use("/film", film);
router.use("/genre", genre);
router.use("/ulasan", ulasan);

module.exports = router;
