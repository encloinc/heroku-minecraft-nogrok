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
			
			for (i in log){
				if(log.split('\n')[i].startsWith('Forwarding')){
					ip = log.split('\n')[i].split(' ')[4]
					break;
				}
			}
		}else{

			ip = 'Serveo failed, port specified is already taken.'
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
