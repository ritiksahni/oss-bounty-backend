const express = require("express");
const router = express.Router();
const bountyController = require("../controllers/bountyController");
const { isAuthenticated } = require("../middlewares/isAuth.middleware");

router.get("/bounties", bountyController.listBounties);
router.post("/get-repo-data", bountyController.fetchRepoData);
router.post("/add-bounty", isAuthenticated, bountyController.createBounty);

module.exports = router;
