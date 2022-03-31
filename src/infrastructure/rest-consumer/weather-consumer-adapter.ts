import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { CountryResponse } from "../../domain/model/response/country-response";
import { HttpErrorHandler } from "../../domain/model/request/custom-error-handler";
import { WeatherRepository } from "../../domain/model/repositories/weather-repository";
import { loadConfig } from '../config';
import { WeatherResponse } from "../../domain/model/response/weather-response";

export class WeatherConsumerAdapter implements WeatherRepository {

    private readonly appConfig = loadConfig();

    async getWeatherByLatLon(params: CountryResponse): Promise<WeatherResponse> {
        const request = this.makeRequest(params);
        const response = await this.getResponse(request);
        return this.parseResponse(response, params);
    }

    makeRequest(params: CountryResponse) {
        const axiosConfig: AxiosRequestConfig = {
            baseURL: this.appConfig.WEATHER_URL,
            headers: {},
            method: 'get',
            params: {
                'appid': this.appConfig.WEATHER_KEY,
                'lat': params.lat,
                'lon': params.lon,
                'exclude': 'minutely,hourly,daily,alerts',
                'units': 'metric',
            }
        };
        return axiosConfig;
    }

    async getResponse(request: AxiosRequestConfig<any>) {
        try {
            const response = await axios.request(request);
            return response.data;
        } catch (error: AxiosError | any) {
            console.error('getResponse error: ', error.message);
            console.trace('getResponse trace: ', error.message);
            if (error.isAxiosError) {
                throw new HttpErrorHandler(400, 'Ocurrio un error consumiendo - weather');
            }
            throw new HttpErrorHandler(400, 'Ocurrio un error consumiendo - weather');
        }
    }

    parseResponse(response: any | string, params: CountryResponse): WeatherResponse {
        try {
            const weatherResponse: WeatherResponse = new WeatherResponse();

            weatherResponse.description = response.current.weather[0].description;
            weatherResponse.icon = `https://openweathermap.org/img/wn/${response.current.weather[0].icon}@2x.png`;
            weatherResponse.temp = response.current.temp;
            weatherResponse.searchTime = response.current.dt;
            weatherResponse.feelsLikeCelsius = response.current.feels_like;
            weatherResponse.clouds = response.current.clouds;
            weatherResponse.windSpeed = response.current.wind_speed;
            weatherResponse.lat = params.lat;
            weatherResponse.lon = params.lon;
            weatherResponse.longName = params.longName;
            weatherResponse.shortName = params.shortName;
            weatherResponse.placeId = params.placeId;

            return weatherResponse;
        } catch (error: any) {
            console.error('getResponse error: ', error.message)
            console.trace('getResponse trace: ', error.message)
            throw new HttpErrorHandler(400, error.message);
        }
    }
}
