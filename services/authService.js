const db = require("../utils/db");

async function getUserFromDb(user_id) {
    const sqlQuery = `SELECT * FROM users WHERE user_id = ?`;
    const values = [user_id];

    try {
        dbPromise = await new Promise((resolve, reject) => {
            db.query(sqlQuery, values, function (err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });

        return dbPromise;
    } catch (err) {
        throw err;
    }
}

async function createUserInDb(user_id, email, username) {
    const sqlQuery = `INSERT INTO users VALUES (?, ?, ?)`;
    const values = [user_id, email, username];

    try {
        const dbPromise = new Promise((resolve, reject) => {
            db.query(sqlQuery, values, function (err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });

        return dbPromise;
    } catch (err) {
        throw err;
    }
}

module.exports = { getUserFromDb, createUserInDb };
