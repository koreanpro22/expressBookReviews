const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const jwtSecret = 'jwtSecret';

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //     return res.status(401).json({ message: "No token provided" });
    // }
    // Verify the token
    jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzY5MzkwMDIsImV4cCI6MTczNjk0MjYwMn0.jz-nRb6xRtXC3LKV9tzoowKtquaYGtiW0q5TV5wq6_E", jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // If token is valid, set the decoded user object to the request for use in other routes
        req.user = decoded;
        next(); // proceed to the next middleware or route handler
    });
});


const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running on", PORT));
