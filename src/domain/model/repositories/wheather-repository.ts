import { CountryResponse } from "../response/country-response";
import { WheatherResponse } from "../response/wheather-response";

export interface WheatherRepository {

    getWheatherByLatLon(params: CountryResponse): Promise<WheatherResponse>;

}
