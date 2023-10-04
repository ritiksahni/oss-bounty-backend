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

async function getClaimById(claim_id) {
    const sqlQuery = `SELECT * FROM claims WHERE id = ?;`;

    const values = [claim_id];
    try {
        const dbPromise = await new Promise((resolve, reject) => {
            db.query(sqlQuery, values, function (err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });

        if (dbPromise.length === 0) {
            throw new Error(`Claim ${claim_id} not found`);
        }

        return dbPromise[0];
    } catch (err) {
        logger.log("error", err);
        throw err;
    }
}

async function approveClaim(bounty_id, claim_id) {
    const claim = await getClaimById(claim_id);

    if (claim.bounty_id !== bounty_id) {
        logger.log("error", {
            message: `Claim ${claim_id} does not belong to bounty ${bounty_id}`,
        });
        throw new Error("Claim does not belong to bounty");
    }

    const sqlQuery = `UPDATE bounties SET approved_claim_id = ? WHERE bounty_id = ? AND approved_claim_id IS NULL;`;

    const values = [claim_id, bounty_id];
    try {
        const dbPromise = await new Promise((resolve, reject) => {
            db.query(sqlQuery, values, function (err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });

        logger.log("info", {
            message: `Claim ${claim_id} approved for bounty ${bounty_id}`,
        });

        return dbPromise;
    } catch (err) {
        logger.log("error", err);
        throw err;
    }
}

module.exports = { addClaim, listClaims, approveClaim };
