import { CountryResponse } from "../model/response/country-response";
import { WheatherRepository } from "../model/repositories/wheather-repository";
import { HttpErrorHandler } from "../model/request/custom-error-handler";
import { LatLonRequest } from "../model/request/lat-lon-request";
import { GeocodeRepository } from "../model/repositories/geocode-repository";
import { WheatherResponse } from "../model/response/wheather-response";
import { WheatherConvert } from "../../infrastructure/helpers/wheather-convert"

export class WheatherUseCase {
    constructor(
        private geocodeRepository: GeocodeRepository,
        private wheatherRepository: WheatherRepository) { }

    async getWheatherByCountry(params: LatLonRequest): Promise<CountryResponse> {
        if (!this.isValidValue(params.countryCode)) {
            throw new HttpErrorHandler(400, 'Invalid countryCode param');
        }
        const geocodeData: CountryResponse = await this.geocodeRepository.getLatLonByCountryCode(params);

        const wheatherData: WheatherResponse = await this.wheatherRepository.getWheatherByLatLon(geocodeData);

        const feelsLikeCelsius = wheatherData.feelsLikeCelsius ? wheatherData.feelsLikeCelsius : 0;
        const searchTime = wheatherData.searchTime ? wheatherData.searchTime : 0;
        wheatherData.searchTimeDate = WheatherConvert.timeConverter(searchTime);
        wheatherData.feelsLikefahrenheit = ((feelsLikeCelsius * 1.8) + 32);

        return wheatherData;
    }

    private isValidValue(value: string | undefined): boolean {
        return (value !== undefined && value !== null)
    }

}
