import { CountryResponse } from "../response/country-response";
import { LatLonRequest } from "../request/lat-lon-request";

export interface GeocodeRepository {

    getLatLonByCountryCode(params: LatLonRequest): Promise<CountryResponse>;

}
