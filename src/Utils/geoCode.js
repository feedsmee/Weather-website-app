const request = require('request')

const geoCode = (adress, callBack) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiZmVlZHNtZWUiLCJhIjoiY2t3d2ZhOThjMDM3YjJxcnJ1bGF1ZjVvdyJ9.rb9Lhxnic0uwVIA93Ok7kw&limit=1'

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callBack('unable to connect to location service!', undefined)
        } else if (response.body.features.length === 0) {
            callBack('unable to find location!', undefined)
        } else {
            callBack(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode