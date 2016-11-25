// app/core/localcache.js
'use strict';

const
    _ = require('underscore');

let inst = null;


function IconCache() {
    this._storage = {};
}

IconCache.getInstance = function() {
    if (!inst || !(inst instanceof IconCache)) {
        inst = new IconCache();
    }

    return inst;
};

_.extend(IconCache.prototype, {

    get: function(key) {
        if (!_.has(this._storage, key)) {
            return null;
        }

        return this._storage[key];
    },

    set: function(key, iconString) {
        this._storage[key] = iconString;
        return iconString;
    }
});

module.exports = IconCache;
