const express = require("express");
const router = express.Router();
const harboursController = require("../controllers/harboursController");

router.route("/:id").get(harboursController.getOne);

router.route("/").get(harboursController.getAll);

module.exports = router;
