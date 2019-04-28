const express = require("express");

const router = express.Router();
const itemsController = require("../controllers/items");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");


router.get("",checkAuth, itemsController.getItems);

router.post("",checkAuth,extractFile,itemsController.addItem);

router.delete("/:id",checkAuth, itemsController.deleteItem);

router.put("",checkAuth,extractFile,itemsController.updateItem);


module.exports = router;