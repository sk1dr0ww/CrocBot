const spawn = require("child_process").spawn;
const discord = require ("discord.js");

exports.run = async (client, message, args) =>{

	var user = message.author.username
	var texto = args.slice().join(' ');

	const pythonProcess = spawn('python3',["./commands/main.py", user, texto]);

	pythonProcess.stdout.on('data', (data) => {
    	message.channel.send(data.toString());
	});
 
};
