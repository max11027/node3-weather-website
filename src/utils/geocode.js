
const request = require('postman-request')

const geocode = (address, callback, limit = 0) => {
    const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const accessToken = 'pk.eyJ1Ijoic3NlcnZvZGlkaW8iLCJhIjoiY2t4ZGI2MTBiNDl3OTJ0cHplZWkyMWFibCJ9.OxQTnnsN2w9IJb55M0GStg'

    request({
        //make sure to account for special characters using an encoder
        url: baseUrl + encodeURIComponent(address) + `.json?access_token=${accessToken}&limit=${limit}`,
        json: true
    }, (error, {body: {features, message} = {}, statusCode} = {}) => {
        if (error) callback('Unable to connect to location services!');
        else if (statusCode != 200) {
            if (message)
                callback(message + '!')
            else callback('Unable to find location!')
        } else if (statusCode == 200 && features && features.length == 0)
            callback('Unable to find location!')
        else {
            const location = features[0]
            callback(undefined, {
                latitude: location.center[1],
                longitude: location.center[0],
                location: location.place_name
            })
        }
    })
}

module.exports = geocode