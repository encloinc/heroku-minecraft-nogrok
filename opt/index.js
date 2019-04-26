#!/usr/bin/env node

var fs = require('fs')
var http = require('http')
log = null
port = null
// Get port of ngrok from ngrok.log
function check(){
	var log = fs.readFileSync('serveo.log', {encoding: 'utf-8'})
	return log.split('\n')[2] === undefined;
}

const inter = setInterval(function(){
	console.log("Checking for serveo.log")
	if(check()){
		log = fs.readFileSync('serveo.log', {encoding: 'utf-8'})
		port = log.split('\n')[2].split(' ')[2]
		start()
		clearInterval(inter)
	}
}, 1000)


function start(){
	const listener = http.createServer(function (request, response) {
	  response.writeHead(200, { 'Content-Type': 'application/json' })
	  response.end('Server Address: serveo.net:' + port)
	}).listen(process.env.PORT || 8080, () => {
	  console.log(`Listening on port: ${listener.address().port}`)
	})
}
