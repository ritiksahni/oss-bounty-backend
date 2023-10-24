// Local Module Imports
// empty

// Loading routes
const bountyRoutes = require("./routes/bountyRoutes");
const adminRoutes = require("./routes/admin/adminRoutes");
const claimRoutes = require("./routes/claimRoutes");
const authRoutes = require("./routes/authRoutes");

// Library Imports
const express = require("express");
const cors = require("cors");
const passport = require("passport");

const app = express();
const port = 3000;

// Middlewares
app.use(
    require("express-session")({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
    res.redirect("http://localhost:5173");
});

// Mounting Routes
app.use("/api", bountyRoutes);
app.use("/api", claimRoutes);
app.use("/api/auth", authRoutes);
app.use("/admin/api", adminRoutes);
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
