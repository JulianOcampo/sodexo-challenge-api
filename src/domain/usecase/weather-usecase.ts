import { CountryResponse } from "../model/response/country-response";
import { WeatherRepository } from "../model/repositories/weather-repository";
import { HttpErrorHandler } from "../model/request/custom-error-handler";
import { LatLonRequest } from "../model/request/lat-lon-request";
import { GeocodeRepository } from "../model/repositories/geocode-repository";
import { WeatherResponse } from "../model/response/weather-response";
import { WeatherConvert } from "../../infrastructure/helpers/weather-convert"

export class WeatherUseCase {
    constructor(
        private geocodeRepository: GeocodeRepository,
        private weatherRepository: WeatherRepository) { }

    async getWeatherByCountry(params: LatLonRequest): Promise<WeatherResponse> {
        if (!this.isValidValue(params.countryCode)) {
            throw new HttpErrorHandler(400, 'Invalid countryCode param');
        }
        const geocodeData: CountryResponse = await this.geocodeRepository.getLatLonByCountryCode(params);

        const weatherData: WeatherResponse = await this.weatherRepository.getWeatherByLatLon(geocodeData);

        const feelsLikeCelsius = weatherData.feelsLikeCelsius ? weatherData.feelsLikeCelsius : 0;
        const searchTime = weatherData.searchTime ? weatherData.searchTime : 0;
        weatherData.searchTimeDate = WeatherConvert.timeConverter(searchTime);
        weatherData.feelsLikefahrenheit = ((feelsLikeCelsius * 1.8) + 32);

        return weatherData;
    }

    private isValidValue(value: string | undefined): boolean {
        return (value !== undefined && value !== null && value != '')
    }

}
