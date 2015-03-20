/**
 * Basic express server
 * Serves static files from the dist/ folder
 */
"use strict";

var express = require("express");

var app = express();
var indexFile = "index.html";

var port = "3000";

app.get("*", function(req, res) {
    if (req.url === "/") {
        req.url = "/" + indexFile;
    }
    res.sendFile(req.url, { root: "./dist/".substr(0, "./dist/".length-1) });
});

app.listen(port);
console.info("Server listening on port " + port);/**
 * Created by jlord on 15-03-20.
 */
