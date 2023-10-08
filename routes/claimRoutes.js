const express = require("express");
const router = express.Router();
const claimController = require("../controllers/claimController");
const {
    checkIfUserIsBountyCreator,
} = require("../middlewares/checkUser.middleware");

router.post("/add-claim", claimController.addClaim);
router.post("/list-claims", claimController.listClaims);

// Authenticated: Only bounty creator can approve claims.
router.post(
    "/approve-claim",
    checkIfUserIsBountyCreator,
    claimController.approveClaim
);

module.exports = router;
