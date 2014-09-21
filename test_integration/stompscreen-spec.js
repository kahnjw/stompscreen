var $ = require('jquery');
var Q = require('q');
var notify = require('promisehelpers').notify;
var chai = require('chai');
var chaiJquery = require('chai-jquery');
var StompScreen = require('../src/index');


chai.use(chaiJquery);
chai.should();

describe('stompscreen', function() {
  this.timeout(5000);
  before(function() {
    var el = document.createElement('div');
    document.body.appendChild(el);
    StompScreen.init({
      el: el,
      src: '/base/stock_video/five.mp4'
    });
  });

  it('initializes the video tag with a src attribute', function(done) {
    $('video.stompscreen-video')
    .should.have.attr('src', '/base/stock_video/five.mp4');

    Q.delay(5000)
    .then(notify(done));
  });
});
