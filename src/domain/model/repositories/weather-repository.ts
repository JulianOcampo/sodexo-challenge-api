import { CountryResponse } from "../response/country-response";
import { WeatherResponse } from "../response/weather-response";

export interface WeatherRepository {

    getWeatherByLatLon(params: CountryResponse): Promise<WeatherResponse>;

}
