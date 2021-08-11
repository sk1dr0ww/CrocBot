const discord = require ("discord.js");
var fs = require('fs');


exports.run = async (client, message, args) =>{

	var user = message.mentions.users.first();
	var guild = message.guild.member(message.mentions.users.first())

  	var bardos = fs.readFileSync('cumplidos.txt').toString().split("\n");

	if(!args[0]){ //si no hay argumentos
		message.channel.send('Tenes que poner un nombre hermoso');
		return;
	}


	if (args[0] == 'add'){ //si el args es add, agrego un nuevo bardo al txt

		var new_bardo = args.slice(1).join(' '); //tomo todo el texto despues del args[0]
		//hago un append al txt
		fs.appendFileSync('cumplidos.txt', '\n'+new_bardo); //lo guardo en el txt
		message.channel.send('(Cum)plido agregado!');
	
	}else{ //si no hay ningun otro args como comando checkeo si menciono a un user

		if (user !== undefined) { //si el @mention no es invalido mando un bardo aleatorio

			const name = user.username; //tomo el nombre del user @mention
	 		var bardo = bardos[Math.floor(Math.random() * bardos.length)] //tomo
			var bardo_msg = bardo.replace('{{name}}', name);

			message.channel.send(bardo_msg);

		}else{
			message.channel.send('Sorry capo, no se quien es ese...');
		}

	}
   
};