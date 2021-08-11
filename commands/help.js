const discord = require ("discord.js");

exports.run = (client, message, args) =>{

message.channel.send({embed: {
      color: 3447003,
      title: "[Comandos CrocBot]",
      fields: [
        { name: "Comando", value: "!croc random\n!croc random add <url imagen>\n!croc random count\n!croc bardo @nombre\n!croc bardo add 'bardo'\n!croc señal", inline: true},
        { name: "Descripcion", value: "Una foto random\nAgrega una foto\nMuestra la cantidad de fotos\nBardea a alguien\nusa {{name}} donde vaya el nombre del bardeado\nLlama a la croc señal!", inline: true}
      ]
    }
  });

};
