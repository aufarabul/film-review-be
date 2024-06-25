const express = require("express");
const router = express.Router();

const film = require("./film");
const genre = require("./genre");

router.use("/film", film);
router.use("/genre", genre);

module.exports = router;
