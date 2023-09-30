const express = require("express");
const router = express.Router();
const claimController = require("../controllers/claimController");

router.post("/add-claim", claimController.addClaim);

module.exports = router;
