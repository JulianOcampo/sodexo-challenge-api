### Sodexo challenge backend

- API built with clean code and clean architecture principles, which provides a weather search service with the input parameter the code of each country, the first thing it does is identify the latitude and longitude of the center of the given country and then with that latitude and longitude searches for the specific climate of the selected country, and with this, satisfy the requirements of making 2 queries to external services "in this case dependent on each other"


## Demo

https://sodexo-challenge-julianocampo.web.app/search   :point_left:


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
```txt
NODE_ENV=development
SERVER_PORT=5000
GEOCODE_KEY=******
GEOCODE_URL=https://maps.googleapis.com/maps/api/geocode/json
WEATHER_KEY=******
WEATHER_URL=https://api.openweathermap.org/data/2.5/onecall
```

## Run Locally Via Docker

>Clone the project

```bash
  git clone https://github.com/JulianOcampo/sodexo-challenge-api.git
```

>Go to the project directory

```bash
  cd sodexo-challenge-api
```

>Install dependencies

```bash
 npm install --save
```


>Run proyect locally

```bash
 npm run dev
```

>Now you can access via something like this

http://localhost:5000/weather-by-country-code?code=CO

>Optionally you can download this postman collection to directly start testing the endpoints

https://www.getpostman.com/collections/6a501bb4a96c5b0dac82


## Run Test
>To run test
```bash
 npm run coverage
```
remember to run **npm install** first 


>In the github actions section you can find the execution of build tasks and unit tests that when you download it you can show the artifact and the result of the coverage in the code.

https://github.com/JulianOcampo/sodexo-challenge-api/actions


## Images

>Coverage result

![Page](/deployment/assets/coverage.png)

>Pipeline

![Page](/deployment/assets/pipeline.png)



>  :mechanical_arm: Love what you do :mechanical_arm: 

