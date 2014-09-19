var $ = require('jquery');
var chai = require('chai');
var chaiJquery = require('chai-jquery');
var StompScreen = require('../src/index');


chai.use(chaiJquery);
chai.should();

describe('stompscreen', function() {
  before(function() {
    var el = document.createElement('div');
    document.body.appendChild(el);
    StompScreen.init({el: el});
  });

  it('initializes itself with a container', function() {
    $('.stompscreen-container').should.exist;
  });

  it('initializes itself with a video element', function() {
    $('video.stompscreen-video').should.exist;
  });
});
