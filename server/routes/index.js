'use strict';

/**
 * Server Routes module
 * @module app/routes/index
 * @param {object} app Express application
 * @param {object} cwd Current working directory
 * @param {object} fs Filesystem access module
 * @param {object} SrvInfo Server information
 */
module.exports = function(app, cwd, fs, SrvInfo) {

	/**
	 * Returns static server diagnostic data.
	 * @name App-diag static
	 * @path {GET} /api/app-diag/static
	 * @code {200}
	 * @response {object} {} Object with array of key/value pairs
	 */
	app.get('/api/app-diag/static', (req, res) => {
		res.format({
			'application/json': () => {
				res.send(SrvInfo['static']());
			}
		});
	});

	/**
	 * Returns dynamic server diagnostic data.
	 * @name App-diag dynamic
	 * @path {WS} /api/app-diag/dynamic
	 * @code {200}
	 * @response {object} {} Object with array of key/value pairs
	 */
	app.ws('/api/app-diag/dynamic', (ws) => {
		console.log('websocket opened /app-diag/dynamic');
		let sender = null;
		ws.on('message', (msg) => {
			console.log('message:',msg);
			function sendData () {
				ws.send(JSON.stringify(SrvInfo['dynamic']()), (err) => {if (err) throw err;});
			}
			if (JSON.parse(msg).action === 'get') {
				console.log('ws open, data sending started');
				sendData();
				sender = setInterval(() => {
					sendData();
				}, 5000);
			}
			if (JSON.parse(msg).action === 'pause') {
				console.log('ws open, data sending paused');
				clearInterval(sender);
			}
		});
		ws.on('close', () => {
			console.log('Persistent websocket: Client disconnected.');
			if (ws._socket) {
				ws._socket.setKeepAlive(true);
			}
			clearInterval(sender);
		});
		ws.on('error', () => {console.log('Persistent websocket: ERROR');});
	});

};
