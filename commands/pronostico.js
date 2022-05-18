/* openweathermap.org API */
const discord = require ("discord.js");
const axios = require('axios');

const apiKey = 'a8cc0d36501820f89067d939d1d2c27c';
const cityName = 'Tandil';

const dsIconCodes = { "01d":":sunny:", "02d":":white_sun_cloud:", "03d":":cloud:", "04d":":cloud:", "09d":":cloud_rain:", "10d":":cloud_rain:", "11d":":thunder_cloud_rain:", "13d":":snowman2:", "50d":":fog:", "01n":":full_moon:", "02n":":cloud:", "03n":":cloud:", "09n":":cloud_rain:", "10n":":cloud_rain:", "11n":":thunder_cloud_rain:", "13n":"snowman2", "50n":":fog:" };

function firstCap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.run = async (client, message, args) =>{

axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=es`)
	.then(({ data }) => {


    var pron = data['list'];

   for (let i = 0; i <= 3; i++) {
       //console.log(`Dia ${i+1} - ${Math.ceil(pron[i]['main']['temp'])}°C - ${pron[i]['weather'][0]['description']} ${ dsIconCodes[pron[i]['weather'][0]['icon']]}`);
       message.channel.send(`Dia ${i+1} - ${Math.ceil(pron[i]['main']['temp'])}°C - ${pron[i]['weather'][0]['description']} ${ dsIconCodes[pron[i]['weather'][0]['icon']]}`)
   }
        

});


};