import { Middleware } from 'koa'
import { GeocodeConsumerAdapter } from '../../../rest-consumer/geocode-consumer-adapter';
import { LatLonRequest } from '../../../../domain/model/request/lat-lon-request';
import { WheatherUseCase } from '../../../../domain/usecase/wheather-usecase';
import { WheatherConsumerAdapter } from '../../../rest-consumer/wheather-consumer-adapter';

const wheatherConsumerAdapter: WheatherConsumerAdapter = new WheatherConsumerAdapter();
const geocodeConsumerAdapter: GeocodeConsumerAdapter = new GeocodeConsumerAdapter();

export const wheatherController: Middleware = async (ctx, next) => {

    const wheatherUseCase = new WheatherUseCase(geocodeConsumerAdapter, wheatherConsumerAdapter);
    const wheatherRequest: LatLonRequest = new LatLonRequest();
    wheatherRequest.countryCode = ctx.request.query.code as string

    ctx.body = await wheatherUseCase.getWheatherByCountry(wheatherRequest);

    await next();
}
