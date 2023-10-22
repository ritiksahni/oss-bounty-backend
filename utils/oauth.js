require("dotenv").config();

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.HOST_BASE_URL || "http://localhost:3000",
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_BASE_URL,
    secret: process.env.AUTH0_SECRET,
    issuer: process.env.AUTH0_BASE_URL,
    audience: process.env.AUTH0_AUDIENCE,
    tokenSigningAlg: "HS256",
};

module.exports = config;
