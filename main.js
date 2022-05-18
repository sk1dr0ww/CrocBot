const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const spawn = require("child_process").spawn;

const client = new Discord.Client();
const config = require('./cfg/config.json')
client.commands = new Enmap();
chalk = require('chalk');
client.config = config;

console.log(' -- CrocBot 2.0 JS --\n');

/*
process.stdout.write(`Uptime: .........`${uptime});
process.stdout.clearLine();
process.stdout.cursorTo(0);
*/

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
      process.stdout.write(chalk.blue(`${commandName}, `));
      client.commands.set(commandName, props);
    });
});


//aca leo los mensajes para responder usando gpt3
client.on('message', message => {
  

  //si el mensaje fue en dev
  //if(message.channel.id == '912904428112195624'){

    // const args = message.content.split(/ +/g);
    // var dnd5 = client.commands.get('dado2');
    // dnd5.run(client, message, args);

    // //si el mensaje es de patricio
    // if(message.author.id  == '293752876797263872'){
    
    // //if not crocbot
    // //if(message.author.id  !== '855824265285730325'){
    
    //     var saul = new RegExp('(saul|goodman|cope)+', 'gi');

    //     const attachments = (message.attachments).array(); // Get list of attachments
    //     const attachment = attachments[0]; // Take the first attachment

    //     message_content = message.content;

    //     if (message_content.match(saul)){
    //       message.delete()
    //       message.channel.send('Saul Goodman is no more.');    
    //       console.log(message.content)
    //     }

    //     if (attachments.length !== 0) {

    //         const nameArray = attachment.name.split('.'); //Split the name 
    //         const attEx = nameArray[nameArray.length - 1] //Grap the last value of the array.


    //             console.log(attachment);

    //             attachment_name = attachment.name;

    //             if(attachment_name == 'Saul_goodman_3d.mp4' || attachment_name.match(saul) || attachment.size == 533586 || attachment.height == 360 || attachment.width == 566){
    //               message.delete()
    //               message.channel.send('Saul Goodman is no more.');    
    //             }

    //         //}
    //     } 

//  }

  //si el mensaje fue en el canal croc-chat (open ai)
  // if(message.channel.id == '879174924277780500' && message.author.id != '855824265285730325'){
  //       var autor = message.author.username
  //       var mensaje = message.content
  //       //invoco main.py el script que crea la respuesta de gpt3 openai
  //       const pythonProcess = spawn('python3',["./commands/main.py", autor, mensaje]);
  //       pythonProcess.stdout.on('data', (data) => {     
  //         var response = data.toString();
  //         if(response.length > 0){
  //           message.channel.send(response);    
  //         }else{
  //           message.channel.send('?');
  //         }
  //         fs.appendFileSync('train.txt', autor+': '+mensaje+'\ncrocbot: '+response);
  //       });
      
  //   }


}); //end client.on('message', message => {

client.on("ready", () => {
    
  /* pseudo cronjobs berreta */

  //status changer
  var estados = fs.readFileSync('/var/www/nimrodsolutions/public_html/crocbot/estados.txt').toString().split("\n");
  var estado = estados[Math.floor(Math.random() * estados.length)];
  client.user.setActivity(estado, { type: "WATCHING" })
  
  setInterval(() => {
  	var estados = fs.readFileSync('/var/www/nimrodsolutions/public_html/crocbot/estados.txt').toString().split("\n");
    var estado = estados[Math.floor(Math.random() * estados.length)];
    client.user.setActivity(estado, { type: "WATCHING" })
  },600000)

  //anime new chapters
  // setInterval(() => {
  //   //esto es mas ilegal que la mierda pero bueno xdfddd
  //   var animecmd = client.commands.get('anime');
  //   animecmd.run(client, '', '');
  // },21600000) //43200000 12hs - 21600000 6hs


  /* pseudo cronjobs berreta */

});

client.login(config.token)