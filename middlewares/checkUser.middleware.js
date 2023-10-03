const db = require("../utils/db");
const { getBountyById } = require("../services/bountyService");
const { logger } = require("../utils/logger");

async function checkUser(req, res, next) {
    await getBountyById(req.body.bounty_id).then((bounty) => {
        if (bounty.user_id === req.oidc.user.sub) {
            next();
        } else {
            res.status(400).json({ message: "User is not bounty creator." });
        }
    });
}

module.exports = { checkUser };
