const redis = require('redis');
const { MatrixManager } = require('./MatrixManager.js')

var client = redis.createClient();
var teamID = "ENTER TEAM ID HERE"

client.on('connect', function(){
	let Matrix = new MatrixManager(client, teamID)	
	//Code here!
})