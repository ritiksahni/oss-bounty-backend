const bountyService = require("../services/bountyService");

function createBounty(req, res) {
    const { repoLink, issueDescription } = req.body;
    bountyService
        .createBounty(repoLink, issueDescription)
        .then((result) => {
            if (result) {
                res.send(201).json({ message: "Bounty successfully created." });
            }
        })
        .catch((err) => {
            next(err);
        });
}

function listBounties(req, res) {
    bountyService
        .listBounties()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            next(err);
        });
}

module.exports = {
    createBounty,
    listBounties,
};
