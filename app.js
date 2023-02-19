const express = require('express');
const app = express();
require('dotenv').config();

// index.js

const { auth, requiresAuth } = require('express-openid-connect');

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

//For checking if the user is logged in.
app.get('/', (req,res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out');
});


// For the User profile route wherein being Logged In is a necessity
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user))
    
    res.send("User Data")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});