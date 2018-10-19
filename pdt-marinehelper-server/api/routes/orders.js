const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

router.route("/").get(ordersController.getAll);
router.route("/").post(ordersController.insertOne);
router.route("/:orderId").delete(ordersController.deleteOne);

module.exports = router;
