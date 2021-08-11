const discord = require ("discord.js");

exports.run = (client, message, args) =>{

	const embedImg = new discord.MessageEmbed()
		.setImage('https://k6teamstore.com/_cursed/imagenes/crocsenal.jpg') 
	message.channel.send({embed: embedImg})

}