const GithubStrategy = require("passport-github").Strategy;
const passport = require("passport");
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

async function verifyUser(accessToken, refreshToken, profile, done) {
    const user_id = `github|${profile.id}`;

    try {
        const user = await getUserFromDb(user_id);

        // If no user is found, create a new user. Otherwise, return the user.
        if (user.length === 0) {
            const email = profile.emails[0].value;
            const username = profile.username;
            await createUserInDb(user_id, email, username);
            const user = await getUserFromDb(user_id);
            done(null, user);
        } else {
            done(null, user);
        }
    } catch (err) {
        done(err);
    }
}

const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/callback",
};

passport.use(new GithubStrategy(githubConfig, verifyUser));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport;
