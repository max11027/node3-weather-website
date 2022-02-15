const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const baseUrl = 'http://api.weatherstack.com/current'
    const accessKey = 'd1ed710dc2248d0c2c8c850dffbdd459'
    const coordinates = latitude + ', ' + longitude

    request({
        url: baseUrl + `?access_key=${accessKey}&query=${encodeURIComponent(coordinates)}`,
        json: true
    }, (error, {body: responseBody} = {}) => {
        if (error) callback('Unable to connect to weather services!')
        else if (responseBody) {
            if (responseBody.error)
                callback('Unable to get weather information!')
            else {
                const {weather_descriptions, temperature, feelslike} = responseBody.current,
                    message = weather_descriptions[0] + ` - It is currently ${temperature}°C out. It feels like ${feelslike}°C out.`           
                callback(undefined, message);
            }
        }
    })
}

module.exports = forecast