const express = require("express");
const router = express.Router();
const claimController = require("../controllers/claimController");
const {
    checkIfUserIsBountyCreator,
} = require("../middlewares/checkUser.middleware");
const { isAuthenticated } = require("../middlewares/isAuth.middleware");

router.post("/list-claims", claimController.listClaims);
router.post("/get-claim-creator", claimController.getClaimCreator);

// Authenticated Routes
router.post("/add-claim", isAuthenticated, claimController.addClaim);

router.post(
    "/approve-claim",
    isAuthenticated,
    checkIfUserIsBountyCreator,
    claimController.approveClaim
);

module.exports = router;
