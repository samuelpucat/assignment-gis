const express = require("express");
const router = express.Router();
const covesController = require("../controllers/covesController");

router.route("/getAllAnchorages").get(covesController.getAllAnchorages);
router.route("/getNearbyAnchorages").get(covesController.getNearbyAnchorages);

router.route("/getAllMoorings").get(covesController.getAllMoorings);
router.route("/getNearbyMoorings").get(covesController.getNearbyMoorings);

router.route("/getAllUnderwaterCablesAndPipes").get(covesController.getAllUnderwaterCablesAndPipes);
router.route("/getNearbyUnderwaterCablesAndPipes").get(covesController.getNearbyUnderwaterCablesAndPipes);

module.exports = router;
