import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { CountryResponse } from "../../domain/model/response/country-response";
import { HttpErrorHandler } from "../../domain/model/request/custom-error-handler";
import { WheatherRepository } from "../../domain/model/repositories/wheather-repository";
import { loadConfig } from '../config';
import { WheatherResponse } from "../../domain/model/response/wheather-response";

export class WheatherConsumerAdapter implements WheatherRepository {

    private readonly appConfig = loadConfig();

    async getWheatherByLatLon(params: CountryResponse): Promise<WheatherResponse> {
        const request = this.makeRequest(params);
        const response = await this.getResponse(request);
        return this.parseResponse(response, params);
    }

    makeRequest(params: CountryResponse) {
        const axiosConfig: AxiosRequestConfig = {
            baseURL: this.appConfig.WHEATHER_URL,
            headers: {},
            method: 'get',
            params: {
                'appid': this.appConfig.WHEATHER_KEY,
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
                throw new HttpErrorHandler(400, 'Ocurrio un error consumiendo - wheather');
            }
            throw new HttpErrorHandler(400, 'Ocurrio un error consumiendo - wheather');
        }
    }

    parseResponse(response: any | string, params: CountryResponse): WheatherResponse {
        try {
            const wheatherResponse: WheatherResponse = new WheatherResponse();

            wheatherResponse.description = response.current.weather[0].description;
            wheatherResponse.icon = `https://openweathermap.org/img/wn/${response.current.weather[0].icon}@2x.png`;
            wheatherResponse.temp = response.current.temp;
            wheatherResponse.searchTime = response.current.dt;
            wheatherResponse.feelsLikeCelsius = response.current.feels_like;
            wheatherResponse.clouds = response.current.clouds;
            wheatherResponse.windSpeed = response.current.wind_speed;
            wheatherResponse.lat = params.lat;
            wheatherResponse.lon = params.lon;
            wheatherResponse.longName = params.longName;
            wheatherResponse.shortName = params.shortName;
            wheatherResponse.placeId = params.placeId;

            return wheatherResponse;
        } catch (error: any) {
            console.error('getResponse error: ', error.message)
            console.trace('getResponse trace: ', error.message)
            throw new HttpErrorHandler(400, error.message);
        }
    }
}
