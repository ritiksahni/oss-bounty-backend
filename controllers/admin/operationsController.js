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

async function addUser(req, res) {
    await operationsService
        .addUser(req.body.user_id, req.body.email, req.body.username)
        .then(() => {
            res.status(200).json({ message: "User added to database." });
        })
        .catch(() => {
            res.status(400).json({
                message:
                    "User cannot be added to database. Check user details.",
            });
        });
}

module.exports = {
    listBounties,
    approveBounty,
    addUser,
};
