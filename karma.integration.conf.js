'use strict';


module.exports = function(config) {
  var configuration = {
    frameworks: ['mocha', 'browserify'],
    browsers: ['Chrome'],
    preprocessors: {
      '/**/*.browserify': 'browserify'
    },
    browserify: {
      files: [
        'test_integration/test-setup.js',
        'test_integration/**/*-spec.js'
      ],
      debug: true,
      watch: true
    },
    files: [
      {
        pattern: 'stock_video/**/*.mp4',
        watched: true,
        served:  true,
        included: false
      }
    ],
    urlRoot: '/karma/',
    reporters : ['spec'],
    singleRun: false
  };

  config.set(configuration);
};
