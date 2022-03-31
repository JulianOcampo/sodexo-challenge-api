import { CountryResponse } from "./country-response";

export class WeatherResponse extends CountryResponse {
    description: string | undefined;
    icon: string | undefined;
    temp: number | undefined;
    searchTime: number | undefined;
    searchTimeDate: string | undefined;
    feelsLikefahrenheit: number | undefined;
    feelsLikeCelsius: number | undefined;
    clouds: number | undefined;
    windSpeed: number | undefined;
}
