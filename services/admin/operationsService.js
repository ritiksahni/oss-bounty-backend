const db = require("../../config/db");

function listBounties() {
    const sqlQuery = `SELECT * FROM bounties`;
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, function (err, rows) {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

function approveBounty(bounty_id) {
    const sqlQuery = `UPDATE bounties SET isApproved = 1 WHERE bounty_id = ?`;
    const values = [bounty_id];
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, values, function (err, rows) {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

function addUser(user_id, email, username) {
    const sqlQuery = `INSERT INTO users VALUES (?, ?, ?)`;
    const values = [user_id, email, username];
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, values, function (err, rows) {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = {
    listBounties,
    approveBounty,
    addUser,
};
