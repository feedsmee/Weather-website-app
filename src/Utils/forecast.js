const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon='+ longitude +'&appid=71db88bd56489385afe99ce5eb016811'

    request({url : url, json:true}, (error, response) => {
        if (error) {
            callback('unable to connect to weather service!', undefined)
        } else if (response.body.cod === '200') {
            callback('unable to find location!', undefined)
        } else {
            callback(undefined, response)
        }
    })
}

module.exports = forecast