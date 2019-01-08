const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const itemController = require("../controllers/itemController");
const validation = require("./validation");

router.get("/items", helper.ensureAuthenticated, itemController.index);
router.get("/items/new", helper.ensureAuthenticated, itemController.new)
router.post("/items/create", helper.ensureAuthenticated, validation.validateItems, itemController.create);
router.get("/items/:id", helper.ensureAuthenticated, itemController.show);
router.post("/items/:id/destroy", helper.ensureAuthenticated, itemController.destroy);
router.get("/items/:id/edit", helper.ensureAuthenticated, itemController.edit);
router.post("/items/:id/update", validation.validateItems, itemController.update);


module.exports = router;