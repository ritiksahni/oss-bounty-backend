// Local Module Imports
const config = require("./config/oauth"); // Auth0 Configuration

// Loading routes
const bountyRoutes = require("./routes/bountyRoutes");

// Library Imports
const { auth } = require("express-openid-connect");
const express = require("express");

const app = express();
const port = 3000;

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(express.json());

// req.isAuthenticated is provided from the auth router
app.get("/test-login", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// Mounting Bounty Routes
app.use("/api", bountyRoutes);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
