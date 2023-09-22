const operationsService = require("../../services/admin/operationsService");

function listBounties(req, res) {
    operationsService
        .listBounties()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            throw err;
        });
}

function approveBounty(req, res) {
    operationsService
        .approveBounty(req.body.bounty_id)
        .then((result) => {
            res.status(200).json({ message: "Bounty approved" });
        })
        .catch((err) => {
            throw err;
        });
}

function addUser(req, res) {
    operationsService
        .addUser(req.body.user_id, req.body.email, req.body.username)
        .then((result) => {
            res.status(200).json({ message: "User added to database." });
        })
        .catch((err) => {
            throw err;
        });
}

module.exports = {
    listBounties,
    approveBounty,
    addUser,
};
