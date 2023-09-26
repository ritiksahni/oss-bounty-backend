const db = require("../../config/db");

function listBounties() {
    const sqlQuery = `SELECT * FROM bounties`;
    const dbPromise = new Promise((resolve, reject) => {
        db.query(sqlQuery, function (err, rows) {
            if (err) reject(err);
            resolve(rows);
        });
    });

    return dbPromise;
}

function approveBounty(bounty_id) {
    const sqlQuery = `UPDATE bounties SET isApproved = 1 WHERE bounty_id = ?`;
    const values = [bounty_id];
    const dbPromise = new Promise((resolve, reject) => {
        db.query(sqlQuery, values, function (err, rows) {
            if (err) reject(err);
            resolve(rows);
        });
    });

    return dbPromise;
}

function addUser(user_id, email, username) {
    const sqlQuery = `INSERT INTO users VALUES (?, ?, ?)`;
    const values = [user_id, email, username];
    const dbPromise = new Promise((resolve, reject) => {
        db.query(sqlQuery, values, function (err, rows) {
            if (err) reject(err);
            resolve(rows);
        });
    });

    return dbPromise;
}

module.exports = {
    listBounties,
    approveBounty,
    addUser,
};
