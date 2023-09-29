const db = require("../../utils/db");
const { logger } = require("../../config/logger");

async function listBounties() {
    const sqlQuery = `SELECT * FROM bounties`;

    try {
        const dbPromise = await new Promise((resolve, reject) => {
            db.query(sqlQuery, function (err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });

        logger.log("info", { message: "Listed all bounties" });
        return dbPromise;
    } catch (err) {
        logger.log("error", err);
        throw err;
    }
}

async function approveBounty(bounty_id) {
    const sqlQuery = `UPDATE bounties SET isApproved = 1 WHERE bounty_id = ? AND isApproved = 0`;
    const values = [bounty_id];

    try {
        const dbPromise = await new Promise((resolve, reject) => {
            db.query(sqlQuery, values, function (err, result) {
                if (result.affectedRows === 1) {
                    // bounty_id found and updated.
                    resolve(result);
                } else if (result.affectedRows === 0) {
                    // 0 affectedRows = bounty_id doesn't exist.
                    reject(
                        `bounty_id ${bounty_id} doesn't exist or is already approved.`
                    );
                } else {
                    // unexpected error
                    reject(err);
                }
            });
        });

        logger.log("info", { message: "Approved bounty_id " + bounty_id });
        return dbPromise;
    } catch (err) {
        logger.log("error", err);
        throw err;
    }
}

async function addUser(user_id, email, username) {
    const sqlQuery = `INSERT INTO users VALUES (?, ?, ?)`;
    const values = [user_id, email, username];

    try {
        const dbPromise = new Promise((resolve, reject) => {
            db.query(sqlQuery, values, function (err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });

        logger.log("info", { message: "Added user to database: " + user_id });
        return dbPromise;
    } catch (err) {
        logger.log("error", err);
        throw err;
    }
}

module.exports = {
    listBounties,
    approveBounty,
    addUser,
};
