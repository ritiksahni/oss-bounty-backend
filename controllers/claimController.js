const claimService = require("../services/claimService");

async function addClaim(req, res) {
    const { bounty_id, claimer_id, description } = req.body;
    await claimService
        .addClaim(bounty_id, claimer_id, description)
        .then(() => {
            res.status(200).json({ message: "Claim successfully added." });
        })
        .catch((err) => {
            if (err.code === "ER_NO_REFERENCED_ROW_2") {
                res.status(400).json({
                    message:
                        "Invalid bounty_id or claimer_id. Bounty or User does not exist.",
                });
            } else if (err.code === "ER_DUP_ENTRY") {
                res.status(400).json({
                    message:
                        "Claim already exists from this user for this bounty.",
                });
            } else {
                // Handle other errors as needed
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
}

async function listClaims(req, res) {
    const { bounty_id } = req.body;
    const listOfClaims = [];

    await claimService
        .listClaims(bounty_id)
        .then((claims) => {
            if (claims.length === 0) {
                res.status(400).json({
                    message: "No claims for this bounty. ",
                });
            } else {
                claims.forEach((claim) => {
                    const { id, bounty_id, claimer_id, description } = claim;
                    listOfClaims.push({
                        id,
                        bounty_id,
                        claimer_id,
                        description,
                    });
                });

                res.status(200).json(listOfClaims);
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Internal Server Error" });
        });
}

async function approveClaim(req, res) {
    const { bounty_id, claim_id } = req.body;

    await claimService
        .approveClaim(bounty_id, claim_id)
        .then(() => {
            res.status(200).json({ message: "Claim successfully approved." });
        })
        .catch((err) => {
            if (err.message == "Claim does not belong to bounty") {
                res.status(400).json({
                    message: `Claim ${claim_id} does not belong to bounty ${bounty_id}`,
                });
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
}

module.exports = { addClaim, listClaims, approveClaim };
