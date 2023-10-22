const express = require("express");
const router = express.Router();
const bountyController = require("../controllers/bountyController");

router.get("/bounties", bountyController.listBounties);
router.post("/get-repo-data", bountyController.fetchRepoData);
router.post("/add-bounty", bountyController.createBounty);

module.exports = router;
