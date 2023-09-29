const db = require("../utils/db");
const { logger } = require("../utils/logger");

async function createBounty(
    repoLink,
    issueDescription,
    user_id,
    bounty_amount
) {
    // columns: bounty_id, repoLink, issueDescription, isApproved, user_id (fk), bounty_amount

    const sqlQuery = `INSERT INTO bounties VALUES (
        DEFAULT,
        ?,
        ?,
        DEFAULT,
        ?,
        ?
    )`;

    const values = [repoLink, issueDescription, user_id, bounty_amount];

    try {
        const dbPromise = await new Promise((resolve, reject) => {
            db.query(sqlQuery, values, function (err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });

        logger.log("info", { message: "Bounty created by " + user_id });
        return dbPromise;
    } catch (error) {
        logger.log("error", error);
        throw error;
    }
}

async function listBounties() {
    const sqlQuery = `SELECT * FROM bounties WHERE isApproved = 1`;

    try {
        const dbPromise = await new Promise((resolve, reject) => {
            db.query(sqlQuery, function (err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });

        logger.log("info", { message: "Listed all approved bounties." });
        return dbPromise;
    } catch (error) {
        logger.log("error", error);
        throw err;
    }
}

module.exports = {
    createBounty,
    listBounties,
};
