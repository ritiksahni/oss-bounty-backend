// Local Module Imports
const config = require("./config/oauth"); // Auth0 Configuration

// Loading routes
const bountyRoutes = require("./routes/bountyRoutes");
const adminRoutes = require("./routes/admin/adminRoutes");

// Library Imports
const { auth } = require("express-openid-connect");
const express = require("express");

const app = express();
const port = 3000;

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(express.json());

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// Mounting Routes
app.use("/api", bountyRoutes);
app.use("/admin/api", adminRoutes);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
