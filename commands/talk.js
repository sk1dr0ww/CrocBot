const discord = require ("discord.js");
const { getAudioUrl } = require("google-tts-api");

exports.run = async (client, message, args) =>{

	const userid = message.author.id;
	const username = message.author.username;
    const voicechannel = message.member.voice.channel;

    if(!voicechannel) return message.channel.send('No estas en un canal de voz');

    const string = args.join(' ');

    const audioURL = await getAudioUrl(string, {
        lang: 'pt',
        slow: false,
        host: 'https://translate.google.com',
        timeout: 10000,
    });

    try{
        voicechannel.join().then(connection => {
            const dispatcher = connection.play(audioURL);
            dispatcher.on('finish', () => {
                voicechannel.leave();
            });
        });
    }
    catch(e){
        console.error(e);
    }

};