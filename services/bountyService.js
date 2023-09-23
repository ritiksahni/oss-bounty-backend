const db = require("../config/db");

function createBounty(repoLink, issueDescription) {
    const sqlQuery = `INSERT INTO bounties VALUES (
        DEFAULT,
        ?,
        ?,
        0
    )`;

    const values = [repoLink, issueDescription];

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
        db.query(sqlQuery, function (err, rows, fields) {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = {
    createBounty,
    listBounties,
};
