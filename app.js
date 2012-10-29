var http = require('http'),
    fs   = require('fs');

var app = http.createServer(function (req, res) {
	fs.readFile(__dirname + '/index.html', function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		res.writeHead(200);
		res.end(data);
	});
});

var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world'});
	socket.on('my other event', function (data) {
		console.log(data);
	});
});

app.listen(3000);