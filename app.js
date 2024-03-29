var handler = function (req, res) {
	console.log('acc');
	fs.readFile(__dirname + '/index.html', function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		res.writeHead(200);
		res.end(data);
	});
};

var app = require('http').createServer(handler),
    io  = require('socket.io').listen(app),
    fs  = require('fs');

app.listen(3000);

io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world'});
	socket.on('my other event', function (data) {
		console.log(data);
	});
});