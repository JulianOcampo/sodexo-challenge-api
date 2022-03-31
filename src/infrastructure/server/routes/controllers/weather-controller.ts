import { Middleware } from 'koa'
import { GeocodeConsumerAdapter } from '../../../rest-consumer/geocode-consumer-adapter';
import { LatLonRequest } from '../../../../domain/model/request/lat-lon-request';
import { WeatherUseCase } from '../../../../domain/usecase/weather-usecase';
import { WeatherConsumerAdapter } from '../../../rest-consumer/weather-consumer-adapter';

const weatherConsumerAdapter: WeatherConsumerAdapter = new WeatherConsumerAdapter();
const geocodeConsumerAdapter: GeocodeConsumerAdapter = new GeocodeConsumerAdapter();

export const weatherController: Middleware = async (ctx, next) => {

    const weatherUseCase = new WeatherUseCase(geocodeConsumerAdapter, weatherConsumerAdapter);
    const weatherRequest: LatLonRequest = new LatLonRequest();
    weatherRequest.countryCode = ctx.request.query.code as string

    ctx.body = await weatherUseCase.getWeatherByCountry(weatherRequest);

    await next();
}
