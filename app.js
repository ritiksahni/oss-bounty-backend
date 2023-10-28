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
const corsOptions = {
    origin: `${process.env.REACT_APP_URL}`,
    optionsSuccessStatus: 200,
    credentials: true,
};

// Middlewares
require("./middlewares/passport.middleware"); // To get passport.js configuration.

app.use(
    require("express-session")({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(express.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", `${process.env.REACT_APP_URL}`);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
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
