const express = require("express");
const router = express.Router();
const bountyController = require("../controllers/bountyController");
const { requiresAuth } = require("express-openid-connect");

router.get("/bounties", bountyController.listBounties);
router.post("/get-repo-data", bountyController.fetchRepoData);
router.post("/add-bounty", requiresAuth(), bountyController.createBounty);

module.exports = router;
