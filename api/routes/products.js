const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "handling get requess to products"
  });
});

router.post("/", (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  };
  res.status(201).json({
    message: "handling post requess to products",
    createdProduct: product
  });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({
      message: "special id",
      id: id
    });
  } else {
    res.status(200).json({
      message: "id",
      id: id
    });
  }
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message: "update product id",
    id: id
  });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message: "delete product id",
    id: id
  });
});

module.exports = router;
