const loaderUtils = require('loader-utils');

function loadHmr(file) {
    const compId = Math.random().toString();
    return `
        var component = require(${file});
        var Vue = require('vue');
        module.exports = component;
        
        /* hot reload */
        if (module.hot) {
            (function() {
                var hotAPI = require('vue-hot-reload-api');
                hotAPI.install(require('vue'), false);
                if (!hotAPI.compatible) {
                    return;
                }

                if (!hotAPI.compatible) {
                    throw new Error('vue-hot-reload-api is not compatible with the version of Vue you are using.')
                }
                module.hot.accept()
                
                if (!module.hot.data) {
                    hotAPI.createRecord(${compId}, component.default)
                } else {
                    hotAPI.rerender(${compId}, component.default)
                    hotAPI.reload(${compId}, component.default)
                }
            })();
        }
    `;

}


module.exports = function load() {
};
module.exports.pitch = function pitch(remainingRequest) {
    const file = loaderUtils.stringifyRequest(this, '!!' + remainingRequest);
    const isProduction = this.minimize || process.env.NODE_ENV === 'production';

    if (this.cacheable) {
        this.cacheable();
    }

    if (isProduction) {
        return `module.exports = require(${file});`;
    }

    return loadHmr(file);
};