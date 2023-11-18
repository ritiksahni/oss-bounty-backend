const operationsService = require("../../services/admin/operationsService");

async function listBounties(req, res) {
    await operationsService
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

async function approveBounty(req, res) {
    await operationsService
        .approveBounty(req.body.bounty_id)
        .then((result) => {
            res.status(200).json({ message: "Bounty approved" });
        })
        .catch((error) => {
            res.status(400).json({
                message: "Bounty not found or already approved.",
            });
        });
}

module.exports = {
    listBounties,
    approveBounty,
};
