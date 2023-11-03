const db = require("../utils/db");
const { parseGithubUrl, getRepoData } = require("../utils/githubFetcher");
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
        ?,
        DEFAULT
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
        return dbPromise;
    } catch (error) {
        logger.log("error", error);
        throw err;
    }
}

async function getBountyById(bounty_id) {
    const sqlQuery = `SELECT * FROM bounties WHERE bounty_id = ?`;
    const values = [bounty_id];

    try {
        const dbPromise = await new Promise((resolve, reject) => {
            db.query(sqlQuery, values, function (err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });

        logger.log("info", { message: `Listed bounty_id ${bounty_id}` });

        return dbPromise;
    } catch (error) {
        logger.log("error", error);
        throw err;
    }
}

async function fetchRepoData(repo_url) {
    try {
        const repo_split_url = parseGithubUrl(repo_url);
        const repo_data = await getRepoData(
            repo_split_url.owner,
            repo_split_url.repoName
        );

        logger.log("info", {
            message: `Fetched repository data of ${repo_url}`,
        });
        return repo_data;
    } catch (err) {
        logger.log("error", err);
        throw err;
    }
}

async function getBountyCreator(user_id) {
    const sqlQuery = `SELECT username FROM users WHERE user_id = ?`;
    const values = [user_id];
    try {
        const dbPromise = await new Promise((resolve, reject) => {
            db.query(sqlQuery, values, function (err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });

        return dbPromise;
    } catch (error) {
        logger.log("error", error);
        throw error;
    }
}

module.exports = {
    createBounty,
    listBounties,
    fetchRepoData,
    getBountyById,
    getBountyCreator,
};
