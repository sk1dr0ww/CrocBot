const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const spawn = require("child_process").spawn;

const client = new Discord.Client();
const config = require('./cfg/config.json')
client.commands = new Enmap();
chalk = require('chalk');
client.config = config;

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });
  
  client.commands = new Enmap();
  
  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(chalk.green(`[+] ${commandName}`));
      client.commands.set(commandName, props);
    });
});





client.on('message', message => {
  if(message.channel.id == '879174924277780500' && message.author.id != '855824265285730325'){
    
        var autor = message.author.username
        var mensaje = message.content

        //invoco main.py el script que crea la respuesta de gpt3 openai
        const pythonProcess = spawn('python3',["./commands/main.py", autor, mensaje]);
        pythonProcess.stdout.on('data', (data) => {
          
          var response = data.toString();
          
          if(response.length > 0){
            message.channel.send(response);    
          }else{
            message.channel.send('?');
          }

          fs.appendFileSync('train.txt', autor+': '+mensaje+'\ncrocbot: '+response);

        });
      
    }
});





client.on("ready", () => {
    
  var estados = fs.readFileSync('estados.txt').toString().split("\n");
  var estado = estados[Math.floor(Math.random() * estados.length)];
  client.user.setActivity(estado, { type: "WATCHING" }) // Status changer - WATCHING / LISTENING / STREAMING / DND / ONLINE

  setInterval(() => {

    var estado = estados[Math.floor(Math.random() * estados.length)];
    client.user.setActivity(estado, { type: "WATCHING" }) // Status changer - WATCHING / LISTENING / STREAMING / DND / ONLINE
  }, 
    600000)

});

client.login(config.token)