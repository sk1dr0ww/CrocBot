const discord = require ("discord.js");
const fs = require('fs');

exports.run = (client, message, args) =>{

	const userid = message.author.id;			//uuid del usuario que invoco el comando
	const username = message.author.username;	//nombre base del usuario (no nickname)

fs.stat(userid, function(err, stat) { //chequeo si el archivo del usuario existe
			
	//file exist	    
	if(err == null) {

		var userdata = JSON.parse(fs.readFileSync(userid, 'utf8'));
		message.channel.send ('Logins de '+username+': '+userdata.logins);

	} else if(err.code === 'ENOENT') {
		message.channel.send ('Logins de '+username+': 0');
	}

});
	
}; //fin exports