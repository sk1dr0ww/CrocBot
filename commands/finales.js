const discord = require ("discord.js");
var _ = require('lodash');
var request = require('request');

exports.run = async (client, message, args) =>{

	var input = args.slice(0).join(' ');

	request({
			uri: "http://nimrodsolutions.xyz/uni.php",
		}, function(error, response, body){
	
		var finales = JSON.parse(body, 'utf8');

		var materias = '';

		_.forEach(finales, function(value){
			
			var str = value.nombre;
			str = _.deburr(str);
			str = _.lowerCase(str);

			if(str.includes(input)){

				materias += '('+value.fecha+') '+value.nombre+' ['+value.responsable+']\n';

			}
		});

		message.channel.send(materias);

	})
 	
};