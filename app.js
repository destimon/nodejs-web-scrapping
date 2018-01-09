'use strict';

let express = require('express');
let fs = require('fs');
let app     = express();
let jade = require('jade');

let server = require('http').createServer(app);  
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));


require('./routes')(app);
	
server.listen(port, () => {
	console.log('Up this shit on ' + port);
});


exports = module.exports = app;