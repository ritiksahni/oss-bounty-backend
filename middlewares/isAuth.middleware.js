function isAuthenticated(req, res, next) {
    if (!req.session.user) {
        res.status(401).json({ message: "User is not logged in." });
        return;
    } else {
        next();
    }
}

module.exports = { isAuthenticated };
