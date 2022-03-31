import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { CountryResponse } from "../../domain/model/response/country-response";
import { HttpErrorHandler } from "../../domain/model/request/custom-error-handler";
import { LatLonRequest } from "../../domain/model/request/lat-lon-request";
import { loadConfig } from '../config';
import { GeocodeRepository } from "src/domain/model/repositories/geocode-repository";

export class GeocodeConsumerAdapter implements GeocodeRepository {

    private readonly appConfig = loadConfig();

    async getLatLonByCountryCode(params: LatLonRequest): Promise<CountryResponse> {
        const request = this.makeRequest(params);
        const response = await this.getResponse(request);
        return this.parseResponse(response);
    }

    makeRequest(params: LatLonRequest) {
        const axiosConfig: AxiosRequestConfig = {
            baseURL: this.appConfig.GEOCODE_URL,
            headers: {},
            method: 'get',
            params: {
                'key': this.appConfig.GEOCODE_KEY,
                'components': `country:${params.countryCode}`
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
                throw new HttpErrorHandler(400, 'Ocurrio un error consumiendo - geocode');
            }
            throw new HttpErrorHandler(400, 'Ocurrio un error consumiendo - geocode');
        }
    }

    parseResponse(response: any | string): CountryResponse {
        try {
            const countryResponse: CountryResponse = new CountryResponse();
            if (response.results.length == 0) {
                throw new Error('No se encontraron datos');
            }
            countryResponse.lat = response.results[0].geometry.location.lat;
            countryResponse.lon = response.results[0].geometry.location.lng;
            countryResponse.longName = response.results[0].address_components[0].long_name;
            countryResponse.shortName = response.results[0].address_components[0].short_name;
            countryResponse.placeId = response.results[0].place_id;

            return countryResponse;
        } catch (error: any) {
            console.error('getResponse error: ', error.message)
            console.trace('getResponse trace: ', error.message)
            throw new HttpErrorHandler(400, error.message);
        }

    }
}
