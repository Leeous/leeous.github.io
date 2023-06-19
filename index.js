// Leeous.com server
const express = require("express");
const app = express();
const fs = require("fs");
const port = 443;
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const serveIndex = require("serve-index");

const corsOptions = {
  origin: 'https://leeous.com',
}

app.use(cors());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

app.use('/ftp', express.static('ftp'), serveIndex('ftp', {'icons': true}));

// Serve public directory
app.use(express.static('docs'));

// Basic routing  
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

app.get("/api/projects", (req, res) => {
    res.sendFile(__dirname + `resource/js/data.json`);
});