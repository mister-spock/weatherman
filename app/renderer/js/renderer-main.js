// app/renderer/js/renderer-main.js
'use strict';

const
    $   = require('jquery'),
    App = require('./views/App');

let container_el = $('.app-container').get(0);

return new App({ el: container_el });
