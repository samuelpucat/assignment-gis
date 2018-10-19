exports.getAll = (req, res, next) => {
  res.status(201).json({
    message: "orders fetched"
  });
};

exports.insertOne = (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };
  res.status(201).json({
    message: "order created",
    createdOrder: order
  });
};

exports.deleteOne = (req, res, next) => {
  const orderId = req.params.orderId;
  res.status(200).json({
    message: "order delete",
    id: orderId
  });
};
