// Local Module Imports
const config = require("./utils/oauth"); // Auth0 Configuration

// Loading routes
const bountyRoutes = require("./routes/bountyRoutes");
const adminRoutes = require("./routes/admin/adminRoutes");
const claimRoutes = require("./routes/claimRoutes");

// Library Imports
const { auth } = require("express-openid-connect");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(express.json());
app.use(cors()); // Enable CORS for all routes.

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
    if (req.oidc.isAuthenticated) {
        res.redirect("http://localhost:5173");
    }
});

// Mounting Routes
app.use("/api", bountyRoutes);
app.use("/api", claimRoutes);
app.use("/admin/api", adminRoutes);
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
