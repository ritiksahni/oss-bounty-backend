const db = require("../utils/db");
const { logger } = require("../utils/logger");

async function addClaim(bounty_id, claimer_id, description) {
    const sqlQuery = `INSERT INTO claims (bounty_id, claimer_id, description) VALUES (
        ?,
        ?,
        ?
    )`;

    const values = [bounty_id, claimer_id, description];
    try {
        const dbPromise = await new Promise((resolve, reject) => {
            db.query(sqlQuery, values, function (err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });

        logger.log("info", {
            message: `Claim added by ${claimer_id} for bounty ${bounty_id}`,
        });
        return dbPromise;
    } catch (err) {
        logger.log("error", err);
        throw err;
    }
}

async function listClaims(bounty_id) {
    const sqlQuery = `SELECT * FROM claims WHERE bounty_id = ?`;

    const values = [bounty_id];
    try {
        const dbPromise = await new Promise((resolve, reject) => {
            db.query(sqlQuery, values, function (err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });

        logger.log("info", {
            message: `Listed all claims for bounty ${bounty_id}`,
        });

        return dbPromise;
    } catch (err) {
        logger.log("error", err);
        throw err;
    }
}

module.exports = { addClaim, listClaims };
