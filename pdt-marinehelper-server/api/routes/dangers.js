const express = require("express");
const router = express.Router();
const dangersController = require("../controllers/dangersController");

router.route("/getDangers").post(dangersController.getDangers);

module.exports = router;
