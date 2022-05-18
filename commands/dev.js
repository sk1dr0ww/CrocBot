const discord = require ("discord.js");
const devs = require('../cfg/devs.json');

exports.run = async (client, message, args) =>{

	const userid = message.author.id;
	const username = message.author.username;
	const preferred_channel = '369278594301820949';
    // if(userid != '221989916131721216'){
    //     return
    // }

    if(!devs.includes(userid)){
    	return
    }

	if(args.length == '0'){
		message.channel.send(`No command specified`);
	}

	if (args[0] == 'say'){
		var string = args.slice(1).join(' ');
		//message.channel.send(string);
		 client.channels.cache.get(preferred_channel).send(string);
	}

	

};
