const bountyService = require("../services/bountyService");

function createBounty(req, res) {
    const { repoLink, issueDescription, user_id, bounty_amount } = req.body;
    bountyService
        .createBounty(repoLink, issueDescription, user_id, bounty_amount)
        .then((result) => {
            res.status(201).json({ message: "Bounty successfully created." });
        })
        .catch((err) => {
            throw err;
        });
}

function listBounties(req, res) {
    bountyService
        .listBounties()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            throw err;
        });
}

module.exports = {
    createBounty,
    listBounties,
};
