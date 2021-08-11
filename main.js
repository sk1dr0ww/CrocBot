const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

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


client.on("ready", () => {
  
  client.user.setActivity('tu vieja', { type: 'WATCHING' });
   
  


  //setInterval(() => {

  //   const statuses = [
  //       `Croqueando`, // Enables the bot to show how many servers it's in, in the status
  //       `Con la vieja de `+user.user, // Enables the bot to show how many channels it's in, in the status
  //   ]
  //   const status = statuses[Math.floor(Math.random() * statuses.length)] // Chooses a random list from statuses and puts it into a variable.
  //   client.user.setActivity(status, { type: "WATCHING" }) // Status changer - WATCHING / LISTENING / STREAMING / DND / ONLINE
  // }, 
  //   5000) // Time for status to change - Recommended  = 20,000 (20 Seconds) - API doesn't really allow less values but it will work

});

client.login(config.token)


