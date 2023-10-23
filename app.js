// Local Module Imports
// empty

// Loading routes
const bountyRoutes = require("./routes/bountyRoutes");
const adminRoutes = require("./routes/admin/adminRoutes");
const claimRoutes = require("./routes/claimRoutes");

// Library Imports
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(express.json());
app.use(cors());

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
    res.redirect("http://localhost:5173");
});

// Mounting Routes
app.use("/api", bountyRoutes);
app.use("/api", claimRoutes);
app.use("/admin/api", adminRoutes);
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
