const express = require("express");
const router = express.Router();
const dangersController = require("../controllers/dangersController");

router.route("/getIsolatedDangers").post(dangersController.getIsolatedDangers);

router.route("/getLateralSigns").post(dangersController.getLateralSigns);

router.route("/getCardinalSigns").post(dangersController.getCardinalSigns);

router.route("/getSpecialPurposeSigns").post(dangersController.getSpecialPurposeSigns);

router.route("/getLights").post(dangersController.getLights);

router.route("/getRocks").post(dangersController.getRocks);

module.exports = router;
