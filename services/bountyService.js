const db = require("../config/db");

function createBounty(repoLink, issueDescription, user_id, bounty_amount) {
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

    return new Promise((resolve, reject) => {
        db.query(sqlQuery, values, function (err, rows) {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

function listBounties() {
    const sqlQuery = `SELECT * FROM bounties WHERE isApproved = 1`;

    return new Promise((resolve, reject) => {
        db.query(sqlQuery, function (err, rows) {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = {
    createBounty,
    listBounties,
};
