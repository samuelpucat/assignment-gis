const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  client.connect();
  client.query("select * from planet_osm_point where \"seamark:type\" is not null limit 1", (err, res2) => {
    res.status(200).json({
        message: "orders fetched",
        result: res2,
        error: err
      });
    client.end();
  });
});

router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };
  res.status(201).json({
    message: "order created",
    createdOrder: order
  });
});

router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "order delete",
    id: orderId
  });
});

module.exports = router;
