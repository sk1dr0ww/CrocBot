# crocBot
el mejor bot de discord de la historia

```JavaScript

const discord = require ("discord.js");
var path = require('path');
const request = require('request');
var fs = require('fs');
var _ = require('lodash');

const base_url = 'https://nimrodsolutions.xyz/crocbot/';

exports.run = (client, message, args) =>{

	const userid = message.author.id;			
	const username = message.author.username;	

	
	var imagenes = fs.readFileSync('imagenes.txt').toString().split("\n");

	if (!args.length) { 

		
		const imagen = imagenes[Math.floor(Math.random() * imagenes.length)] 

		
		const embedImg = new discord.MessageEmbed()
			.setImage(base_url+imagen) 
		message.channel.send({embed: embedImg})

	}


	if (args[0] == 'add'){ 
	

		if(args[2] != ''){	
			basename = args[2];
		}else{	
			basename = path.basename(args[1]);
		}
	
		e = path.extname(args[1]).toLowerCase(); 

		if (e == '.wmv' || e == '.mp4'){

		}

		
		if (e == '.png' ||e == '.jpg' || e == '.jpeg'){ 

			fs.stat('../imagenes/'+basename, function(err, stat) { 
			    if(err == null) {
			        message.channel.send('Imagen ya existe!')

			    } else if(err.code === 'ENOENT') { 

			       	
			       	var download = function(uri, filename, callback){
					  request.head(uri, function(err, res, body){
					    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
					  });
					};

					
					download(args[1], '../imagenes/'+basename, function(){
				  
					});

					
					const fs = require('fs');
					fs.appendFileSync('imagenes.txt', '\n'+basename);

					message.channel.send('Imagen agregada!')

			    } else {

			    	
			        console.log('Oh no, la croc se rompio!: ', err.code);
			    }
			});
									
		}else{ 
			message.channel.send('Formato incorrecto [.png, .jpg, .jpeg]')
		} 

	}; 


	if (args[0] == 'count'){ 
		message.channel.send('Hay '+imagenes.length+' archivos en la croc.')
	}; 

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
			
		return content;
	}
	
	function getFecha(t, d = 0){
	    var date = new Date(t);
	    date.setDate(date.getDate()+d);
	    date = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + date.getFullYear();
	    return date;
    }


	if (args[0] == 'multi'){ 

		fs.stat(userid, function(err, stat) { 
				    
			if(err == null) {
				
				
				var lastTime = fs.readFileSync(userid, 'utf8')

				
				if ((Date.now() - lastTime) > 86400000) /* 86400000ms = 1 dia */ { 		
					
					showMulti();		
					fs.writeFileSync(userid,Date.now());
				
				
				} else {
			
					message.channel.send('Ya gastaste tu multi, segui esperando capo.');

				}
				        

				} else if(err.code === 'ENOENT') {
				    
				    fs.writeFileSync(userid,Date.now());
				    showMulti();

				} else {
				    
				    message.channel.send ('an error ocurred $uuid: '+userid);
				}
		});

	}; 
	
}; 

```
