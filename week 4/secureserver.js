// We need the file system here
//can open， read write files
var fs = require('fs');

// Express is a node module for building HTTP servers
var express = require('express');
var app = express();

// Tell Express to look in the "public" folder for any files first
app.use(express.static('public'));

// If the user just goes to the "route" / then run this function
app.get('/', function (req, res) {
  res.send('Hello World!')
});


// Here is the actual HTTP server
// In this case, HTTPS (secure) server
var https = require('https');

// Security options - key and certificate
var options = {
  key: fs.readFileSync('star_itp_io.key'),//my key: !privaye key!
  cert: fs.readFileSync('star_itp_io.pem')//my certificate: !public information! that describe who you are
};

// We pass in the Express object and the options object
var httpServer = https.createServer(options, app);

// Default HTTPS port:443
httpServer.listen(443);

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
	// We are given a websocket object in our function
	function (socket) {

		console.log("We have a new client: " + socket.id);

		// When this user "send" from clientside javascript, we get a "message"
		// client side: socket.send("the message");  or socket.emit('message', "the message");
		socket.on('sendImage',
			// Run this function when a message is sent
			function (data) {
				// console.log(data);

        let datatosend = {
          image: data.image,
          id: socket.id,
          filter: data.filter,
          location: data.location
        }

				// Call "broadcast" to send it to all clients (except sender), this is equal to
				// socket.broadcast.emit('message', data);
				// socket.broadcast.send(data);

				// To all clients, on io.emit instead
				io.emit('receiveImage', datatosend);
			}
		);

		socket.on('disconnect', function() {
			console.log("Client has disconnected");
		});
	}
);
