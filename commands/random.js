const discord = require ("discord.js");
const path = require('path');
const request = require('request');
const fs = require('fs');
const _ = require('lodash');
const fns = require('date-fns');
const eoLocale = require('date-fns/locale/es');
const random = require('random');
const config = require('../cfg/config.json');

const imagesDir = config.localdir;
const base_url = config.url+config.webdir;	//url donde se encuentran las imagenes

const valid_ext = ['.png', '.jpg', '.jpeg', '.wmv', '.mp4', '.webm'];	//valid extentions

//normalizo el rango de numeros aleatorios cuantico (0-65535) a (0-cantImagenes)
function NormalizeRange(random, max){
	return Math.ceil((parseInt(random)/65535)*parseInt(max));
}


exports.run = (client, message, args) =>{

	const userid = message.author.id;			//uuid del usuario que invoco el comando
	const username = message.author.username;	//nombre base del usuario (no nickname)

	//creo un array de todos los nombres de las imagenes
	//const imagenes = fs.readFileSync('imagenes.txt').toString().split("\n"); //deprecated, nesecitaba un .txt con los nombres de las imagenes
	var imagenes = [];
	fs.readdirSync(imagesDir).forEach(file => { 
		imagenes = _.concat(imagenes, file);
	});
	
	if (!args.length) { //comando base, si no hay ningun argumento, elijo una imagen aleatoria y la muestro

		//elijo una imagen aleatoria
		//const imagen = imagenes[Math.floor(Math.random() * imagenes.length)]
		var imagen = imagenes[random.int(0, imagenes.length)];

		//eiv = path.extname(args[1]).toLowerCase();

		//envio la imagen embebida con un link absoluto desde el servidor
		const embedImg = new discord.MessageEmbed()
			.setImage(base_url+imagen) 
		message.channel.send({embed: embedImg})

	}

	//si el argumento es quantum, muestra una imagen random pero usando qrng numeros aleatorios cuanticos
	if(args[0] == 'quantum'){

		request({
			uri: "https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint16",
		}, function(error, response, body){
			
			//qrng devuelve un json con los numeros
			var quantum = JSON.parse(body, 'utf8');

			//tomo solo el arreglo de numeros del json
			quantumInt = quantum.data;

			//tomo el valor normalizado
			nQint = NormalizeRange(quantumInt, imagenes.length);

			var imagen = imagenes[nQint];

			const embedImg = new discord.MessageEmbed()
				.setImage(base_url+imagen)
				.setDescription('qInt #'+quantumInt+' → Normal #'+nQint)
			message.channel.send({embed: embedImg})

		});



	}

	//
	//TODO: arreglar un bug que al subir una imagen nueva da error "ya existente" y hay que forzar el nombre para subirla
	//


	if (args[0] == 'count'){ //si el argumento es count muestro la cantidad de lineas en el archivo txt
		message.channel.send('Hay '+imagenes.length+' archivos en la croc.')
	}; //fin args count

	function showMulti(quantum){
				
			//si la opcion es quantum	
			if(quantum == true){
				request({
					uri: "https://qrng.anu.edu.au/API/jsonI.php?length=5&type=uint16",
				}, function(error, response, body){
					
					//qrng devuelve un json con los numeros
					var quantum = JSON.parse(body, 'utf8');

					//tomo solo el arreglo de numeros del json
					quantumInt = quantum.data;

					for(var i=0; i<5; i++) {

						var multi = imagenes[NormalizeRange(parseInt(quantumInt[i]), imagenes.length)];

						const embedImg = new discord.MessageEmbed()
							.setImage(base_url+multi) 
							.setFooter('qInt Seed #'+quantumInt[i]);
						message.channel.send({embed: embedImg})

					}

				});

			//si no la funcion normal
			}else{
				for(var i=0; i<5; i++) {
					var multi = imagenes[random.int(0, imagenes.length)]
					const embedImg = new discord.MessageEmbed()
						.setImage(base_url+multi) 
					message.channel.send({embed: embedImg})
				}
			}	
			
	} //fin showMulti()

	if (args[0] == 'multi'){ //si el arg es multi envia 5 fotos aleatorias y pone un timer de 24hs al usuario

		if(args[1] == 'quantum'){
			quantum = true;
		}else{
			quantum = false;
		}

		fs.stat(userid, function(err, stat) { //chequeo si el archivo del usuario ya existe
			
			//file exist	    
			if(err == null) {

				//leo el json con los datos del usuario
				var userdata = JSON.parse(fs.readFileSync(userid, 'utf8'));
				//fecha actual en unix epoch en ms
				var dateNow = new Date();
				//leo el valor unix epoch del archivo del usuario. ms > s > unix to date
				var lastMulti = fns.fromUnixTime(fns.millisecondsToSeconds(userdata.lastMulti));
				//calculo la diferencia en horas desde el ultimo multi
				var hourDifference = fns.differenceInHours(dateNow,lastMulti);

				//si pasaron +24hs
				if(hourDifference >= 24){

					showMulti(quantum);		
					
					userdata.lastMulti = Date.now();	//renuevo la fecha del ultimo multi
					userdata.logins++;	//incremento +1 el contador de logins diarios

					//si pasaron +48hs pierde el login
					// if(hourDifference >= 48){ 
					// 	userdata.logins = 1; //reinicio el contador
					// 	message.channel.send ('perdiste el login :(');
					// }

					// message.channel.send ('Logins de '+username+': '+userdata.logins);

					//guardo los nuevos datos
					fs.writeFileSync(userid,JSON.stringify(userdata));

				//falta tiempo	
				} else {

					//calculo el tiempo faltante (fecha en el archivo + 24hs)
					var remaining = fns.formatDistanceToNow(fns.addDays(lastMulti,1),{locale: eoLocale});
					message.channel.send('Proximo multi disponible en '+remaining);

				}
				        

				} else if(err.code === 'ENOENT') {
				    // file does not exist
				    var new_userdata = {};

					new_userdata.lastMulti = Date.now();
					new_userdata.logins = 1;

				    fs.writeFileSync(userid,JSON.stringify(new_userdata));
				    showMulti(quantum);

				} else {
				    //cualquier otro error que halla pasado
				    message.channel.send ('algo en la croc se rompio xd');
				}
		});

	}; //fin args multi

	
}; //fin exports