const express = require("express");
const router = express.Router();
const harboursController = require("../controllers/harboursController");

router.route("/getHarbour").get(harboursController.getOne);

router.route("/getAllHarbours").get(harboursController.getAll);

router.route("/getAllWithFacilities").post(harboursController.getAllWithFacilities);

module.exports = router;
