import { WeatherUseCase } from "../../../src/domain/usecase/weather-usecase";
import { GeocodeConsumerAdapter } from '../../../src/infrastructure/rest-consumer/geocode-consumer-adapter'
import { WeatherConsumerAdapter } from '../../../src/infrastructure/rest-consumer/weather-consumer-adapter'
import { LatLonRequest } from "../../../src/domain/model/request/lat-lon-request";
import axios from "axios";
import { create, successRequest } from "../../__mocks__/mockAxios";
import { HttpErrorHandler } from "../../../src/domain/model/request/custom-error-handler";

describe('WeatherUseCase test', () => {

    const geocodeConsumerAdapter = new GeocodeConsumerAdapter();
    const weatherConsumerAdapter = new WeatherConsumerAdapter();
    const weatherUseCase = new WeatherUseCase(geocodeConsumerAdapter, weatherConsumerAdapter);
    const latLonRequest: LatLonRequest = new LatLonRequest();

    beforeEach(() => {
        jest.resetModules();
        process.env = Object.assign(process.env,
            {
                NODE_ENV: 'development',
                SERVER_PORT: 5000,
                GEOCODE_KEY: '123',
                GEOCODE_URL: 'https://maps.googleapis.com/maps/api/geocode/json',
                WEATHER_KEY: '123',
                WEATHER_URL: 'https://api.openweathermap.org/data/2.5/onecall'
            });
        axios.create = create;

    });

    afterEach(() => {
        jest.restoreAllMocks();
    })

    it('ProductUseCase.getWeatherByCountry() ValidCountryCode', async () => {
        axios.request = successRequest;
        latLonRequest.countryCode = 'CO';

        const weatherResponse = await weatherUseCase.getWeatherByCountry(latLonRequest);

        expect(weatherResponse.shortName).toEqual('CO');
    })

    it('ProductUseCase.getWeatherByCountry() InValidCountryCode', async () => {
        axios.request = successRequest;
        latLonRequest.countryCode = '';

        try {
            await weatherUseCase.getWeatherByCountry(latLonRequest);
        } catch (e: unknown | HttpErrorHandler) {
            if (e instanceof HttpErrorHandler) {
                expect(e.message).toBe('Invalid countryCode param');
            }
        }
    })

})