const GithubStrategy = require("passport-github").Strategy;
const passport = require("passport");
const { getUserFromDb, createUserInDb } = require("../services/authService");

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/api/auth/callback",
        },
        async function (accessToken, refreshToken, profile, cb) {
            const user_id = `github|${profile.id}`;
            const email = profile.emails[0].value;
            const username = profile.username;

            await getUserFromDb(user_id).then((result) => {
                if (result.length === 0) {
                    createUserInDb(user_id, email, username);
                }
            }); // To add a new user to the database.

            return cb(null, [accessToken, refreshToken, profile]);
        }
    )
);

module.exports = passport;
