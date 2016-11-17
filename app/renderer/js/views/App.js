// app/renderer/js/views/App.js
'use strict';

const
    $          = require('jquery'),
    Backbone   = require('backbone'),
    handlebars = require('handlebars'),
    tpl        = require('../tpl/view'),

    {ipcRenderer}         = require('electron'),
    {enquireApi, getIcon} = require('../../../core/enquire'),

    App = Backbone.View.extend({

        initialize: function() {
            this.error = false;

            enquireApi()
                .then(this._on_data.bind(this))
                .catch((err) => {
                    this.error = true;
                    ipcRenderer.send('api-error', err);
                    this.render();
                });
        },

        render: function() {
            let html = '';

            if (this.error) {
                html = tpl({ error: this.error });
            }
            else {
                html = tpl({
                    // TODO: What data to pass to the template
                });
            }

            this.$el.html(html);

            return this;
        },

        _on_data: function(data) {
            let dataParsed = JSON.parse(data);

            getIcon(dataParsed.weather[0].icon)
                .then((encodedIcon) => {
                    this.icon     = encodedIcon;
                    this.temp     = dataParsed.main.temp;
                    this.pressure = dataParsed.main.pressure;
                    this.humidity = dataParsed.main.humidity;
                    this.cityName = dataParsed.name;
                    this.country  = dataParsed.sys.country;

                    this.render();
                })
                .catch((err) => {
                    this.error = true;
                    ipcRenderer.send('icon-error', err);
                    this.render();
                });
        }
    });

module.exports = App;
