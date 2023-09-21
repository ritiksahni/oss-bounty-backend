const mysql = require("mysql");

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "test",
    database: "oss_bounty",
});

module.exports = conn;
