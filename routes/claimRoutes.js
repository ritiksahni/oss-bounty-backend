const express = require("express");
const router = express.Router();
const claimController = require("../controllers/claimController");

router.post("/add-claim", claimController.addClaim);
router.post("/list-claims", claimController.listClaims);

module.exports = router;
