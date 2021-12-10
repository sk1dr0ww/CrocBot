const discord = require ("discord.js");
const wiki = require('wikijs').default;

exports.run = (client, message, args) =>{

if(args.length >= 1){

	var topic = args.slice(0).join(' ');
	//console.log(topic)
	

	// if (args.length == 1){
	// 	var topic = args[0];
	// }


	wiki({ apiUrl: 'https://es.wikipedia.org/w/api.php' })
		.find(topic)
		.then(page => page
			.chain()
			.summary()
			.request()
		)
	.then((result) => {
		step1(result);
	});

	function step1(data){

		wiki({ apiUrl: 'https://es.wikipedia.org/w/api.php' })
		.find(topic)
		.then(page => page
			.mainImage()
		)
	.then((result) => {
		step2(data, result)
	});
		
	}

	function step2(data, image){
		const embedImg = new discord.MessageEmbed()
		.setImage(image)
		.setFooter(data.title)
		.setDescription(data.extract)
		message.channel.send({embed: embedImg})
	}

}

};