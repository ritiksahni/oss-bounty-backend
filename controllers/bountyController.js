const bountyService = require("../services/bountyService");

async function createBounty(req, res) {
    const user_id = `github|${req.session.user[0].user_id}`;
    const { repoLink, issueDescription, bounty_amount } = req.body;
    await bountyService
        .createBounty(repoLink, issueDescription, user_id, bounty_amount)
        .then(() => {
            res.status(200).json({ message: "Bounty successfully created." });
        })
        .catch((err) => {
            if (err.code === "ER_NO_REFERENCED_ROW_2") {
                res.status(500).json({
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

async function fetchRepoData(req, res) {
    await bountyService
        .fetchRepoData(req.body.repo_url)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(() => {
            res.status(400).json({
                message: "Repository cannot be found.",
            });
        });
}

async function getBountyById(req, res) {
    const { bounty_id } = req.body;
    await bountyService
        .getBountyById(bounty_id)
        .then((result) => {
            res.status(200).json(result[0]);
        })
        .catch(() => {
            res.status(400).json({
                message: "Bounty cannot be found.",
            });
        });
}

module.exports = {
    createBounty,
    listBounties,
    fetchRepoData,
    getBountyById,
};
