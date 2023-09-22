const express = require("express");
const router = express.Router();
const operationsController = require("../../controllers/admin/operationsController");

router.get("/bounties", operationsController.listBounties);
router.post("/approve-bounty", operationsController.approveBounty);
router.post("/add-user", operationsController.addUser);

module.exports = router;
