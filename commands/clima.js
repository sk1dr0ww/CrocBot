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

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=es`)
	.then(({ data }) => {
    //var clima = JSON.parse(data);
    //console.log(data['main']);

    var temp = data['main'];
    var clima = data['weather'][0];
    var viento = data['wind'];

    if(args[0] == '+'){
        message.channel.send(`Clima en **${cityName}**: ${Math.ceil(temp['temp'])}°C :small_red_triangle_down:${Math.ceil(temp['temp_min'])}°C :small_red_triangle:${Math.ceil(temp['temp_max'])}°C - ( ${Math.ceil(temp['feels_like'])}°C ST - Viento de ${viento['speed']}km/h - Humedad ${temp['humidity']}% ) - **${firstCap(clima['description'])}** ${dsIconCodes[clima['icon']]}`);
    }else{
        message.channel.send(`Clima en **${cityName}**: ${Math.ceil(temp['temp'])}°C - ${firstCap(clima['description'])} ${dsIconCodes[clima['icon']]}`);
    }

});

};

/*

https://ws1.smn.gob.ar/v1/forecast/location/4265

4265 -> Tandil

Cabecera Authorization:
JWT eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3ZWIiLCJzY29wZXMiOiJST0xFX1VTRVJfRk9SRUNBU1QsUk9MRV9VU0VSX0dFT1JFRixST0xFX1VTRVJfSElTVE9SWSxST0xFX1VTRVJfSU1BR0VTLFJPTEVfVVNFUl9NQVAsUk9MRV9VU0VSX1NUQVRJU1RJQ1MsUk9MRV9VU0VSX1dBUk5JTkcsUk9MRV9VU0VSX1dFQVRIRVIiLCJpYXQiOjE2Mzk1NDgyMDcsImV4cCI6MTYzOTYzNDYwN30.M67yqBHYxLqN9v7130UcAz_AVhKe-tKYgrrvXLZNi_0

*/