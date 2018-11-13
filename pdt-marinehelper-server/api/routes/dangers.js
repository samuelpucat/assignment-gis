const express = require("express");
const router = express.Router();
const dangersController = require("../controllers/dangersController");

router.route("/getIsolatedDangers").post(dangersController.getIsolatedDangers);

router.route("/getLateralSigns").post(dangersController.getLateralSigns);

module.exports = router;
