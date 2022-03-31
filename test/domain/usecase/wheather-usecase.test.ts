import { WheatherUseCase } from "../../../src/domain/usecase/wheather-usecase";
import { GeocodeConsumerAdapter } from '../../../src/infrastructure/rest-consumer/geocode-consumer-adapter'
import { WheatherConsumerAdapter } from '../../../src/infrastructure/rest-consumer/wheather-consumer-adapter'
import { LatLonRequest } from "../../../src/domain/model/request/lat-lon-request";
import axios from "axios";
import { create, successRequest } from "../../../test/__mocks__/mockAxios";
import { HttpErrorHandler } from "../../../src/domain/model/request/custom-error-handler";

describe('WheatherUseCase test', () => {

    const geocodeConsumerAdapter = new GeocodeConsumerAdapter();
    const wheatherConsumerAdapter = new WheatherConsumerAdapter();
    const wheatherUseCase = new WheatherUseCase(geocodeConsumerAdapter, wheatherConsumerAdapter);
    const latLonRequest: LatLonRequest = new LatLonRequest();

    beforeEach(() => {
        jest.resetModules();
        process.env = Object.assign(process.env,
            {
                NODE_ENV: 'development',
                SERVER_PORT: 5000,
                GEOCODE_KEY: '123',
                GEOCODE_URL: 'https://maps.googleapis.com/maps/api/geocode/json',
                WHEATHER_KEY: '123',
                WHEATHER_URL: 'https://api.openweathermap.org/data/2.5/onecall'
            });
        axios.create = create;

    });

    afterEach(() => {
        jest.restoreAllMocks();
    })

    it('ProductUseCase.getWheatherByCountry() ValidCountryCode', async () => {
        axios.request = successRequest;
        latLonRequest.countryCode = 'CO';

        const wheatherResponse = await wheatherUseCase.getWheatherByCountry(latLonRequest);

        expect(wheatherResponse.shortName).toEqual('CO');
    })

    it('ProductUseCase.getWheatherByCountry() InValidCountryCode', async () => {
        axios.request = successRequest;
        latLonRequest.countryCode = '';

        try {
            await wheatherUseCase.getWheatherByCountry(latLonRequest);
        } catch (e: unknown | HttpErrorHandler) {
            if (e instanceof HttpErrorHandler) {
                expect(e.message).toBe('Invalid countryCode param');
            }
        }
    })

})