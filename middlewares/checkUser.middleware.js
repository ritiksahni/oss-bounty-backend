const db = require("../utils/db");
const { getBountyById } = require("../services/bountyService");
const { logger } = require("../utils/logger");

async function checkIfUserIsBountyCreator(req, res, next) {
    await getBountyById(req.body.bounty_id).then((bounty) => {
        if (!req.oidc.user) {
            res.status(401).json({ message: "User is not logged in." });
            return;
        }

        if (bounty[0].user_id === req.oidc.user.sub) {
            next();
        } else {
            logger.log("error", {
                message: `User ${req.oidc.user.sub} is trying to approve a claim for bounty ${req.body.bounty_id} but is not the bounty creator.`,
            });
            res.status(400).json({ message: "User is not bounty creator." });
        }
    });
}

module.exports = { checkIfUserIsBountyCreator };

/* Example Bounty

{
    "bounty_id": 77,
    "repoLink": "https://github.com/abc/abc-test",
    "issueDescription": "test, created on october 3",
    "isApproved": 0,
    "user_id": "github|58897439",
    "bounty_amount": 10,
    "approved_claim_id": null
}

*/
