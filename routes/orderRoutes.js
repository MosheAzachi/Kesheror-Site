const router = require("express").Router();
const orderController = require("../controllers/ordersController");
router.post("/", orderController.createOrder);
router.get("/", orderController.getOrder);
module.exports = router;