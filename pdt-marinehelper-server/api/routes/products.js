const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.route("/").get(productsController.getAll);

router.route("/").post(productsController.insertOne);

router.route("/:productId").get(productsController.getOne);

router.route("/:productId").patch(productsController.updateOne);

router.route("/:productId").delete(productsController.deleteOne);

module.exports = router;
