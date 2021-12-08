const express = require("express");
const tokenController = require("../controllers/tokenController");
const router = express.Router();

router.route("/").get(tokenController.getToken);

module.exports = router;
