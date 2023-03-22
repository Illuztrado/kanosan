const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feed");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/category/:id", ensureAuth, feedController.getCategory);

module.exports = router;