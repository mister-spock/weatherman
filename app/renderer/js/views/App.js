// app/renderer/js/views/App.js
'use strict';

const
    $             = require('jquery'),
    Backbone      = require('backbone'),
    handlebars    = require('handlebars'),
    tpl           = require('../tpl/view'),
    {ipcRenderer} = require('electron'),

    App = Backbone.View.extend({

        initialize: function() {
            this.error        = false;
            this.errorMessage = '';

            ipcRenderer.send('api-enquire');
            ipcRenderer.on('api-reply', (event, data) => {
                let dataParsed = JSON.parse(data),
                    iconCode   = dataParsed.weather[0].icon;

                this.data = {
                    temp     : dataParsed.main.temp,
                    pressure : dataParsed.main.pressure,
                    humidity : dataParsed.main.humidity,
                    cityName : dataParsed.name,
                    country  : dataParsed.sys.country
                };

                ipcRenderer.send('icon-enquire', iconCode);
            });

            ipcRenderer.on('icon-reply', (event, iconEncoded) => {
                this.data.icon = iconEncoded;
                this.render();
            });

            ipcRenderer.on('render-error', (event, errorMessage) => {
                this.error        = true;
                this.errorMessage = errorMessage;
                this.render();
            });
        },

        render: function() {
            let html = '';

            if (this.error) {
                html = tpl({
                    error   : this.error,
                    message : this.errorMessage
                });
            }
            else {
                html = tpl(this.data);
            }

            this.$el.html(html);

            return this;
        }
    });

module.exports = App;
