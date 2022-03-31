import axios from 'axios';

const response: any = {
    "results": [
        {
            "address_components": [
                {
                    "long_name": "Colombia",
                    "short_name": "CO",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "Colombia",
            "geometry": {
                "bounds": {
                    "northeast": {
                        "lat": 13.5177999,
                        "lng": -66.8463122
                    },
                    "southwest": {
                        "lat": -4.227109899999999,
                        "lng": -81.8317
                    }
                },
                "location": {
                    "lat": 4.570868,
                    "lng": -74.29733299999999
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 13.5177999,
                        "lng": -66.8463122
                    },
                    "southwest": {
                        "lat": -4.227109899999999,
                        "lng": -81.8317
                    }
                }
            },
            "place_id": "ChIJo5QVrjqkFY4RQKPy7wSaDZo",
            "types": [
                "country",
                "political"
            ]
        }
    ],
    "status": "OK",
    "lat": 8.538,
    "lon": -80.7821,
    "timezone": "America/Panama",
    "timezone_offset": -18000,
    "current": {
        "dt": 1648748928,
        "sunrise": 1648725673,
        "sunset": 1648769581,
        "temp": 28.66,
        "feels_like": 28.53,
        "pressure": 1009,
        "humidity": 43,
        "dew_point": 14.86,
        "uvi": 14.03,
        "clouds": 86,
        "visibility": 10000,
        "wind_speed": 3.55,
        "wind_deg": 12,
        "wind_gust": 2.6,
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }
        ]
    }
}

const create = jest.fn().mockImplementation(() => axios)
const successRequest = jest.fn().mockResolvedValue({ data: response, status: 200 });
const failureRequestByCode = jest.fn().mockResolvedValue({ data: response, status: 404 });
const failureRequestByException = jest.fn()
    .mockRejectedValue({
        message: "Request failed with status code 500"
    });

export { create, successRequest, failureRequestByCode, failureRequestByException };