const discord = require ("discord.js");
var path = require('path');
const request = require('request');
var fs = require('fs');
var _ = require('lodash');

const base_url = 'https://k6teamstore.com/_cursed/imagenes/';	//url donde se encuentran las imagenes

exports.run = (client, message, args) =>{

	const userid = message.author.id;			//uuid del usuario que invoco el comando
	const username = message.author.username;	//nombre base del usuario (no nickname)

	//creo un array de todos los nombres de las imagenes
	var imagenes = fs.readFileSync('imagenes.txt').toString().split("\n");

	

	if (!args.length) { //comando base, si no hay ningun argumento, elijo una imagen aleatoria y la muestro

		//elijo una imagen aleatoria
		const imagen = imagenes[Math.floor(Math.random() * imagenes.length)] // Chooses a random list from statuses and puts it into a variable.

		//envio la imagen embebida con un link absoluto desde el servidor
		const embedImg = new discord.MessageEmbed()
			.setImage(base_url+imagen) 
		message.channel.send({embed: embedImg})

	}


	if (args[0] == 'add'){ //si el argumento es add

		//si el segundo argumento no esta vacio ej.: (!croc random add[0] 'url'[1] 'forced_name'[2])
		//forza el nombre de la imagen a descargar al nombre del args[2]

		if(args[2] != ''){	//si no esta vacio, tomo el nombre de args[2]
			basename = args[2];
		}else{	//y si esta vacio, tomo el nombre original del archivo
			basename = path.basename(args[1]);
		}
	
		e = path.extname(args[1]).toLowerCase(); //tomo la extension del archivo, y la convierto en minusculas para no tener que usar dos checkeos (.jpg y .JPG)

		if (e == '.wmv' || e == '.mp4'){

		}//fin si es video

		//verifico la extension del archivo (si es imagen) TODO: convertir todas las posibilidades en array
		if (e == '.png' ||e == '.jpg' || e == '.jpeg'){ 

			fs.stat('../imagenes/'+basename, function(err, stat) { //chequeo si la imagen ya existe para no agregarla dos veces
			    if(err == null) {
			        message.channel.send('Imagen ya existe!')

			    } else if(err.code === 'ENOENT') { //file does not exist

			       	//si no existe descargo la imagen
			       	var download = function(uri, filename, callback){
					  request.head(uri, function(err, res, body){
					    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
					  });
					};

					//descargo la imagen
					download(args[1], '../imagenes/'+basename, function(){
				  
					});

					//hago un append al txt de nombres de las imagenes con la nueva imagen
					const fs = require('fs');
					fs.appendFileSync('imagenes.txt', '\n'+basename);

					message.channel.send('Imagen agregada!')

			    } else {

			    	//cualquiero otro error que alla pasado
			        console.log('Oh no, la croc se rompio!: ', err.code);
			    }
			});
									
		}else{ //error si el formato del archivo es incorrecto
			message.channel.send('Formato incorrecto [.png, .jpg, .jpeg]')
		} //fin si es imagen

	}; //fin args add


	if (args[0] == 'count'){ //si el argumento es count muestro la cantidad de lineas en el archivo txt
		message.channel.send('Hay '+imagenes.length+' archivos en la croc.')
	}; //fin args count

	function showMulti(){
		var multi = '';
		for(var i=0; i<5; i++) {
			multi = imagenes[Math.floor(Math.random() * imagenes.length)];
			const embedImg = new discord.MessageEmbed()
				.setImage(base_url+multi) 
			message.channel.send({embed: embedImg})
		}
	}

	function TimeCounter(n){
		var content="";
		var tx=n;
		t=parseInt(tx);

		var days=parseInt(t/86400);
		t=t-(days*86400);
		var hours=parseInt(t/3600);
		t=t-(hours*3600);
		var minutes=parseInt(t/60);
		t=t-(minutes*60);
		
		if(days)content+=days+" dias y";
		
		if(hours||days){if(days)content+=" ";
			content+=hours+" horas ";
		}
		//content+=minutes+" minutes and "+t+" seconds.";
		
		return content;
	}
	
	function getFecha(t, d = 0){
	    var date = new Date(t);
	    date.setDate(date.getDate()+d);
	    date = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + date.getFullYear();
	    return date;
    }


	if (args[0] == 'multi'){ //si el arg es multi envia 5 fotos aleatorias y pone un timer de 24hs al usuario

		fs.stat(userid, function(err, stat) { //chequeo si el archivo del usuario ya existe
				    
			if(err == null) {
				//file exist
				//leo el valor de tiempo del archivo del usuario
				var lastTime = fs.readFileSync(userid, 'utf8')

				//si pasaron 24hs
				if ((Date.now() - lastTime) > 86400000) /* 86400000ms = 1 dia */ { 		
					
					showMulti();		
					fs.writeFileSync(userid,Date.now());
				
				//falta tiempo	
				} else {

					//tTime = (((Date.now() - lastTime)/7)-(3600*20))
					//var proxDate = Date(lastTime+86400000+72000000);
					//proxDate.toLocaleString('es-ES', { timeZone: 'Argentina/Buenos_aires' })
					//console.log(proxDate);
					message.channel.send('Ya gastaste tu multi, segui esperando capo.');

				}
				        

				} else if(err.code === 'ENOENT') {
				    // file does not exist
				    fs.writeFileSync(userid,Date.now());
				    showMulti();

				} else {
				    //cualquier otro error que alla pasado
				    message.channel.send ('an error ocurred $uuid: '+userid);
				}
		});

		

		

	}; //fin args multi

	
}; //fin exports