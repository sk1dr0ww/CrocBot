const discord = require ("discord.js");
const path = require('path');
const request = require('request');
//const _ = require('lodash');
//const fns = require('date-fns');
const fs = require('fs');
const config = require('../cfg/config.json');

const valid_ext = ['.png', '.jpg', '.jpeg', '.wmv', '.mp4', '.webm'];	//valid extentions

exports.run = async (client, message, args) =>{

	var user = message.author.username
	var texto = args.slice().join(' ');


	if(args[1] == ''){
		return;
	}
	
	//filename = path.basename(args[1]);
	url = args[0];
	ext = path.extname(url).toLowerCase(); 
	
	if (valid_ext.includes(ext)){ 

	   	//si no existe descargo la imagen
	   	var download = function(uri, filename, callback){
		  request.head(uri, function(err, res, body){
		    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
		  });
		};

		new_filename = Date.now()+ext;

		//descargo la imagen
		download(url, '/var/www/nimrodsolutions/public_html/croc/'+new_filename, function(){});

		message.react('✅');

								
	}else{ //error si el formato del archivo es incorrecto
		message.channel.send(ext+' formato invalido');
	} //fin si es imagen

 
};
