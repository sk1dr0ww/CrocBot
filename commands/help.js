const discord = require ("discord.js");

exports.run = (client, message, args) =>{

message.channel.send({embed: {
      color: 3447003,
      title: "[Comandos CrocBot]",
      fields: [
        { name: "Comando", value: "!croc random\n!croc random multi\n!croc random add <url imagen>\n!croc random count\n!croc bardo @nombre\n!croc bardo add 'texto'\n!croc uwu @nombre\n!croc uwu add 'texto'\n!croc señal\n!croc finales 'materia'", inline: true},
        { name: "Descripcion", value: "Una foto random\n5 fotos random (24hs)\nAgrega una foto\nMuestra la cantidad de fotos\nBardea a alguien\nPone {{name}} donde vaya el nombre\nDice algo lindo\nPone {{name}} donde vaya el nombre\nLlama a la croc señal!\nMuestra las fechas de los finales", inline: true}
      ]
    }
  });

};
