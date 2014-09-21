var Controls = require('./controls');


function StompScreen(options) {
  if(typeof options.el === 'string') {
    options.el = document.querySelector(options.el);
  }

  this.el = options.el;
  this.src = options.src;

  this.setupScreen(this.el);
  this.controls = new Controls(this.controlsEl);
  this.paint();
}

StompScreen.prototype.setupScreen = function(el) {
  this.containerEl = document.createElement('div');
  this.videoEl = document.createElement('video');
  this.controlsEl = document.createElement('div');

  this.videoEl.setAttribute('src', this.src);
  this.containerEl.classList.add('stompscreen-container');
  this.videoEl.classList.add('stompscreen-video');

  this.containerEl.appendChild(this.videoEl);
  this.containerEl.appendChild(this.controlsEl);

  return this.containerEl;
};

StompScreen.prototype.paint = function() {
  this.el.appendChild(this.containerEl);

  return this.el;
};

module.exports = StompScreen;
