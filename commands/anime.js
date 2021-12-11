const discord = require ("discord.js");
var fs = require('fs');
const axios = require('axios');
const _ = require('lodash');
const fns = require('date-fns');

const fileJsonAnime = 'anime.json';
const fileJsonManga = 'manga.json';


const regexCaps = new RegExp('Capitulo ([0-9]{1,2})', 'g');
const regexTitulo = new RegExp('<title>(.+) — MonosChinos<\/title>', 'g');

//dev channel id 912904428112195624
//general channel id 369278594301820949
const preferredChannel = '369278594301820949';

function messageEmbedExploit(msg, url){
	return msg+" ||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| "+url;
}

exports.run = async (client, message, args) =>{

	var dateNow = fns.format(new Date(), 'HH:mm:ss');

	/* -------- monoschinos -------- */

	var animeList = JSON.parse(fs.readFileSync(fileJsonAnime).toString());
	animeList.forEach(value => {

		axios.get(value.url) 
			.then(({ data }) => {

				var newLastCap = parseInt(_.findLastKey(data.match(regexCaps)))+1;

				if(newLastCap > value.last){ //si hay nuevo capitulo de algo mando mensaje

					value.last = newLastCap;
					console.log("["+dateNow+"] Nuevo capitulo "+newLastCap+" de '"+value.title+"' !");
					client.channels.cache.get(preferredChannel).send(messageEmbedExploit('<@&918713277322764359> Nuevo capitulo '+newLastCap+' de **'+value.title+'**', value.url));

					var jsonAnime = JSON.stringify(animeList);
					fs.writeFileSync(fileJsonAnime, jsonAnime);

				}else{
					console.log("["+dateNow+"] No hay capitulos de '"+value.title+"' nuevos.");
				}	

		}); // end axios	
	}); // end _.forEach

	/* -------- end monoschinos -------- */

	/* -------- inmanga -------- */

	var mangaList = JSON.parse(fs.readFileSync(fileJsonManga).toString());
	mangaList.forEach(value => {

		axios.get(value.urlws) 
			.then(({ data }) => {

			var listaCapManga = JSON.parse(data['data'])['result'];
			dataNewCapManga = _.last(listaCapManga)
			newLastCapManga = dataNewCapManga['Number'];
			
			if(newLastCapManga > value.last){

				value.last = newLastCapManga;
				console.log("["+dateNow+"] Nuevo capitulo "+newLastCapManga+" de '"+value.title+"' !");
				client.channels.cache.get(preferredChannel).send(messageEmbedExploit('<@&918713277322764359> Nuevo capitulo '+newLastCapManga+' de **'+value.title+'**', value.url+"/"+newLastCapManga+"/"+dataNewCapManga['Identification']));

				var jsonManga = JSON.stringify(mangaList);
				fs.writeFileSync(fileJsonManga, jsonManga);

			}else{
				console.log("["+dateNow+"] No hay capitulos de '"+value.title+"' nuevos.");
			}

		}); // end axios	
	}); // end _.forEach

	/* -------- end inmanga -------- */

};