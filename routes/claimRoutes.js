const express = require("express");
const router = express.Router();
const claimController = require("../controllers/claimController");

router.post("/add-claim", claimController.addClaim);
router.post("/list-claims", claimController.listClaims);

// Authenticated: Only bounty creator can approve claims.
router.post("/approve-claim", claimController.approveClaim);

module.exports = router;
