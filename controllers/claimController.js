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
            } else {
                // Handle other errors as needed
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
}

module.exports = { addClaim };
