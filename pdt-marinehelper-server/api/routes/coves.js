const express = require("express");
const router = express.Router();
const covesController = require("../controllers/covesController");

router.route("/getAllAnchorages").get(covesController.getAllAnchorages);

router.route("/getAllMoorings").get(covesController.getAllMoorings);

router.route("/getAllRestrictedAreas").get(covesController.getAllRestrictedAreas);

router.route("/getAllUnderwaterCablesAndPipes").get(covesController.getAllUnderwaterCablesAndPipes);

module.exports = router;
