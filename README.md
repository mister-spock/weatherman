## Weatherman

Simple application to show current local weather.

#### Usage:
- `npm install` has post-install hook that will do some primitive setup for the app
- simply run `npm start` from project dir

#### Development:
- NPM supports a few tasks right now
- use `npm run jshint` to check you code
- use `npm run style` to compile your SCSS

#### Be sure to check `app/config/conf.js`:
- it holds API key for [OpenWeatherMap](http://openweathermap.org), you can feel free to use mine, but better get your own
- be sure to change `CITY_ID` to your local city's ID from [OpenWeatherMap](http://openweathermap.org), maybe later I'll implement some geolocation

### Have fun
