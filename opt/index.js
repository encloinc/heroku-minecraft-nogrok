#!/usr/bin/env node

var fs = require('fs')
var http = require('http')
log = null
ip = null
// Get port of ngrok from ngrok.log
function check(){
	var log = fs.readFileSync('serveo.log', {encoding: 'utf-8'})
	return log.split('\n')[1] !== undefined;
}

const inter = setInterval(function(){
	console.log("Checking for serveo.log")
	if(check()){
		log = fs.readFileSync('serveo.log', {encoding: 'utf-8'})
		if(!log.includes('failed')){
			
			ip = log.split('\n')[3].split(' ')[4]
		}else{

			ip = 'serveo failed, port specified is probably used'
		}
		start()
		clearInterval(inter)
	}
}, 1000)


function start(){
	const listener = http.createServer(function (request, response) {
	  response.writeHead(200, { 'Content-Type': 'application/json' })
	  response.end('Server Address: ' + ip)
	}).listen(process.env.PORT || 8080, () => {
	  console.log(`Listening on port: ${listener.address().port}`)
	})
}
