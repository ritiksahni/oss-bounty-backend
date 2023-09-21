const express = require("express");
const router = express.Router();
const bountyController = require("../controllers/bountyController");

router.get("/bounties", bountyController.listBounties);
router.post("/add-bounty", bountyController.createBounty);

module.exports = router;
