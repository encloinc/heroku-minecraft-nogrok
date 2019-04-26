#!/usr/bin/env node

var fs = require('fs')
var http = require('http')

// Get port of ngrok from ngrok.log
var log = fs.readFileSync('serveo.log', {encoding: 'utf-8'})
var port = log
const listener = http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end('Server Address: serveo.net:' + port)
}).listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port: ${listener.address().port}`)
})
