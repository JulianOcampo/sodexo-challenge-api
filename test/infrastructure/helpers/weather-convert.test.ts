import { WeatherConvert } from "../../../src/infrastructure/helpers/weather-convert";

describe('Weather Convert helper test', () => {
    const dateTimestamp: Date = new Date(2022, 0, 1);
    beforeEach(() => {
        jest.resetModules();
    });

    it('timeConverter() helper test from Timestamp', () => {

        expect(WeatherConvert.timeConverter(Math.round(dateTimestamp.getTime() / 1000)))
            .toEqual('1 Jan 2022 0:0:0')
    })

})
