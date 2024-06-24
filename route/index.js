const express = require("express");
const router = express.Router();

const film = require("./film");

router.use("/film", film);

module.exports = router;
