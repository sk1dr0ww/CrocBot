const discord = require ("discord.js");

let LeagueAPI = require('leagueapiwrapper');

rgapi = 'RGAPI-7ebb1430-b1c0-45d5-b5da-04f9d6297ea4';
LeagueAPI = new LeagueAPI(rgapi, Region.LAS);

exports.run = (client, message, args) =>{

var summonerName = args[0];

	LeagueAPI.getSummonerByName(summonerName).then(player => {
		
		LeagueAPI.getLeagueRanking(player)
			.then(rank => {

				nrank = 'unranked';

				rank.forEach(r => {
					if("tier" in r){
						nrank = r.tier+" "+r.rank+" ("+r.leaguePoints+" LP)";
					}
				})
				

				//onsole.log(player, rank);
				//console.log(`${player.name} > Level ${player.summonerLevel} > ${nrank}`);
				message.channel.send(`${player.name} > Level ${player.summonerLevel} > ${nrank}`);
			})
			.catch(err => {
				console.log(err);
			});

	})
	.catch(err => {
		message.channel.send(`'${summonerName}' no existe`);
	})

}; //fin exports