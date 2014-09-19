var StompScreenPrototype = require('./stompscreen');

var StompScreen = {
  init: function(options) {
    return new StompScreenPrototype(options);
  }
};

module.exports = StompScreen;
