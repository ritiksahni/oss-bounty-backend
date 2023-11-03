const express = require("express");
const router = express.Router();
const bountyController = require("../controllers/bountyController");
const { isAuthenticated } = require("../middlewares/isAuth.middleware");

router.get("/bounties", bountyController.listBounties);
router.post("/get-repo-data", bountyController.fetchRepoData);
router.post("/get-bounty-creator", bountyController.getBountyCreator);
router.post("/add-bounty", isAuthenticated, bountyController.createBounty);
router.post("/get-bounty", isAuthenticated, bountyController.getBountyById);

module.exports = router;
