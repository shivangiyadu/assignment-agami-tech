const expres = require("express");
const router = expres.Router();

const staffController = require("../controllers/staff");
const orderController = require("../controllers/order");

router.post("/staff", staffController.createStaff);
router.get("/get/staff", staffController.getAllStaff);
router.put("/update/staff/:id", staffController.updateStaff);
router.patch("/upate/partial/:id", staffController.partialUpdateStaff);
router.delete("/deleteStaff/:id", staffController.deleteStaff);

router.post("/order", orderController.createOrder);
router.get("/get/order", orderController.getAllOrder);
router.put("/update/order/:id", orderController.updateOrder);
router.patch("/upate/order/:id", orderController.partialUpdateOrder);
router.delete("/delete/order/:id", orderController.deleteOrder);



module.exports = router;
