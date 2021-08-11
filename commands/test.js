const discord = require ("discord.js");
var fs = require('fs');

exports.run = async (client, message, args) =>{

	const userid = message.author.id;
	const username = message.author.username;
	const { voice } = message.member;

	if(!voice.channelID){
		message.channel.send('not in channel');
	}else{
		message.channel.send('in channel');
		voice.channel.join();
	}


 	 
};