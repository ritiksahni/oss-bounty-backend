const { getBountyById } = require("../services/bountyService");
const { logger } = require("../utils/logger");

async function checkIfUserIsBountyCreator(req, res, next) {
    await getBountyById(req.body.bounty_id).then((bounty) => {
        const user_id = `github|${req.session.user[0].user_id}`;
        if (bounty.length === 0) {
            logger.log("error", {
                message: `User ${user_id} is trying to approve a claim for bounty ${req.body.bounty_id} but bounty does not exist.`,
            });
            res.status(400).json({ message: "Bounty does not exist." });
        } else if (bounty[0].user_id === user_id) {
            next();
        } else {
            logger.log("error", {
                message: `User ${user_id} is trying to approve a claim for bounty ${req.body.bounty_id} but is not the bounty creator.`,
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
