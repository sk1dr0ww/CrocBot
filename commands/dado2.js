/* ---------------------------------------- */
/* DND5 toolbox for discord.js by sangub86_ */
/* ---------------------------------------- */

const discord = require("discord.js");
const random = require("random");
const request = require('request');
const _ = require("lodash");

const preferredChannel = '912904428112195624';

function rollDice(dice) {
    //array con los tipos de dados validos
    valid_dices = [4, 6, 8, 10, 12, 20, 100];
    //si el numero de dado ingresado no esta en el array, devuelve un error
    if(valid_dices.includes(dice)){
      return random.int(1,dice);
    }else{
      return 0;
    }
}

//esta funcion recibe un numero x, min y max de entrada, y min y max de salida. lo que hace es convertir un determinado rango a uno distinto
//por ejemplo tengo una funcion que devuelve numeros aleatorios entre 1 y 65535, pero quiero que sean en un rango de 1 a 20. esta funcion lo permite
function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function qRandInt(min, max){
  //basura inmunda
};


exports.run = async (client, message, args) => {
 
  if(args[0] == '#'){
    
    var len = args.length;
    var total = 0;
    var msg = ':game_die: ';

    args.forEach(element => {

      if(element.startsWith('d')){
       
        dice = parseInt(element.slice(1));
        roll = rollDice(dice);

          if(roll == 0){
            message.channel.send(`Dado **d${dice}** invalido.`);
            throw 'illegal_dice'; 
          }

        total += roll;
        msg += ` ${roll} +`;

      }

      if(element.startsWith('+')){
        
        plus = parseInt(element.slice(1));
        msg += ` ${plus} +`;
        total += plus;

      }

    });

    if(total >= 1){
      msg = msg.slice(0, -1);
      msg += ` (Total: **${total}**)`;
      message.channel.send(msg);
    }

  }

  if(args[0] == '#coinflip'){
    var side = random.int(1,2);
    if(side == 1){
      face = 'Cara';
    }else{
      face = 'Seca';
    }
    message.channel.send(`:coin: ${face}`);
  }

};

