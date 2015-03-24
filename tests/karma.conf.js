module.exports = function(config) {
    console.log("Reading config file for karma");
    config.set({

        basePath: '../',
        frameworks: ['browserify', 'jasmine'],

        files: [
            'app/**/*.js',
            'tests/**/*.js'
        ],

        exclude: [
        ],

        preprocessors: {
            'app/**/*.js': ['browserify'],
            'tests/**/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: [ 'babelify' ]
        }

        // define reporters, port, logLevel, browsers etc.
    });
};