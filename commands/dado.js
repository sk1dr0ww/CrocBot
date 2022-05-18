const discord = require("discord.js");
const random = require("random");

function roll(num) {
  switch (num) {
    case 4:
      num = Math.ceil(Math.random() * 4);
      break;
    case 6:
      num = Math.ceil(Math.random() * 6);
      break;
    case 8:
      num = Math.ceil(Math.random() * 8);
      break;
    case 10:
      num = Math.ceil(Math.random() * 10);
      break;
    case 12:
      num = Math.ceil(Math.random() * 12);
      break;
    case 20:
      num = Math.ceil(Math.random() * 20);
      break;
    case 100:
      num = Math.ceil(Math.random() * 100);
      break;
  }
}

exports.run = async (client, message, args) => {
  num = 0;
  if ((args[0] = "x")) {
    for (let i = 0; i < args[1]; i++) {
      num += roll(args[2]);
    }
    message.channel.send("sacaste un " + num);
  } else if ((args[0] = "+")) {
    num = roll(args[2]);
    num += args[1];
    message.channel.send("sacaste un " + num);
  }
};

/*
exports.run = async (client, message, args) => {
  switch (args[0]) {
    case 4:
      num = Math.ceil(Math.random() * 4);
      break;
    case 6:
      num = Math.ceil(Math.random() * 6);
      break;
    case 8:
      num = Math.ceil(Math.random() * 8);
      break;
    case 10:
      num = Math.ceil(Math.random() * 10);
      break;
    case 12:
      num = Math.ceil(Math.random() * 12);
      break;
    case 20:
      num = Math.ceil(Math.random() * 20);
      break;
    case 100:
      num = Math.ceil(Math.random() * 100);
      break;
  }
  message.channel.send(`sacaste un  ${num}`);
};
*/
