const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const port = process.env.PORT || 3000;

var key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
var options = {
    key: key,
    cert: cert
};

app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/apiRoutes'); //importing route
routes(app); //register the route

var server = https.createServer(options, app);

server.listen(port, () => {
    console.log('API server started on: ' + port);
});