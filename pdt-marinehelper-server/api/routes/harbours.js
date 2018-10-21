const express = require("express");
const router = express.Router();
const harboursController = require("../controllers/harboursController");

router.route("/getHarbour").get(harboursController.getOne);

router.route("/getAllHarbours").get(harboursController.getAll);

module.exports = router;
