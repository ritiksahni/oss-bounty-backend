const express = require("express");
const router = express.Router();
const operationsController = require("../../controllers/admin/operationsController");

router.get("/bounties", operationsController.listBounties);
router.post("/approve-bounty", operationsController.approveBounty);

module.exports = router;
