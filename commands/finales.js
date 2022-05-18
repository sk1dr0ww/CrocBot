const discord = require ("discord.js");
const axios = require('axios'); 
const _ = require('lodash');

const regex = new RegExp('dataSet = \'(.*?)\'');

exports.run = async (client, message, args) =>{

	var input = args.slice(0).join(' ');

	axios.get('https://aulas.exa.unicen.edu.ar/') 
	.then(({ data }) => {
		
		const json_finales = data.match(regex)[1];

		var finales = JSON.parse(json_finales, 'utf8');

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

	});
	
};