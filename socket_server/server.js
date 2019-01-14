var express = require('express');
var http = require('http');
var app = express();
var PORT = 7900;

var server = http.Server(app);
var graphqlRealTimeUpdates = require("./index");

graphqlRealTimeUpdates.configure(server, app);

server.listen(PORT, (function () {
    console.log("socket server is running on port [" + PORT + "]");
}));


