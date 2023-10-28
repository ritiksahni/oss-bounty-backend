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
    req.session = null;
    req.logout();
    res.redirect(`${process.env.REACT_APP_URL}`);
});

module.exports = router;