const express = require("express");
const router = express.Router();
const passport = require("../middlewares/passport.middleware");

router.get(
    "/login",
    passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
    "/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect(`${process.env.REACT_APP_URL}/dashboard`);
    }
);

router.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return res.status(500).json({ error: err.toString() });
        }
        req.session = null;
        res.redirect(`${process.env.REACT_APP_URL}`);
    });
});

router.get("/user", (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.json({ user: null });
    }
});

module.exports = router;
