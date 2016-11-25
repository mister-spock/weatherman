'use strict';

const
    API_HOST = 'api.openweathermap.org',
    API_KEY  = "859e0f7c9f8bcccaf873f1a2b0085b04",
    CITY_ID  = "706369",
    ICON_URL = 'openweathermap.org';

module.exports = {
    apiHost     : API_HOST,
    apiPath     : `/data/2.5/weather?id=${CITY_ID}&units=metric&APPID=${API_KEY}`,
    apiInterval : 1200000, // 20 minutes,
    iconHost    : ICON_URL,
    iconPath    : '/img/w/'
};
