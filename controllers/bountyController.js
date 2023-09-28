const bountyService = require("../services/bountyService");

async function createBounty(req, res) {
    const { repoLink, issueDescription, user_id, bounty_amount } = req.body;
    await bountyService
        .createBounty(repoLink, issueDescription, user_id, bounty_amount)
        .then(() => {
            res.status(200).json({ message: "Bounty successfully created." });
        })
        .catch((err) => {
            if (err.code === "ER_NO_REFERENCED_ROW_2") {
                res.status(400).json({
                    message: "Invalid user_id. User does not exist.",
                });
            } else {
                // Handle other errors as needed
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
}

async function listBounties(req, res) {
    await bountyService
        .listBounties()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(() => {
            res.status(500).json({
                message: "Internal Server Error",
            });
        });
}

module.exports = {
    createBounty,
    listBounties,
};
