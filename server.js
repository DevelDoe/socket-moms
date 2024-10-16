const https = require("https");
const WebSocket = require("ws");
const fs = require("fs");

// Load your SSL certificates
const server = https.createServer({
	cert: fs.readFileSync("/path/to/your/cert.pem"),
	key: fs.readFileSync("/path/to/your/key.pem"),
});

const port = 4000;

// Create a WebSocket server on port 5000
const wss = new WebSocket.Server({ port });

console.log(`Websocket server is listening on ws://localhost:${port}`);

// Listen for connection events
wss.on("connection", (ws) => {
	console.log("New client connected");

	// Send a welcome message to the client
	ws.send("Welcome to the WebSocket server!");

	// Listen for messages from the client
	ws.on("message", (message) => {
		console.log(`Received: ${message}`);
		// Echo the message back to the client
		ws.send(`Echo: ${message}`);
	});

	// Listen for the client disconnecting
	ws.on("close", () => {
		console.log("Client disconnected");
	});
});
