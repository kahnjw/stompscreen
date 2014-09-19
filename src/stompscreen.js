function StompScreen(options) {
  if(typeof options.el === 'string') {
    options.el = document.querySelector(options.el);
  }

  this.el = options.el;

  this.setupScreen(this.el);
}

StompScreen.prototype.setupScreen = function(el) {
  this.containerEl = document.createElement('div');
  this.videoEl = document.createElement('video');
  this.controlsEl = document.createElement('div');

  this.containerEl.classList.add('stompscreen-container');
  this.videoEl.classList.add('stompscreen-video');

  this.containerEl.appendChild(this.videoEl);
  this.containerEl.appendChild(this.controlsEl);
  el.appendChild(this.containerEl);
};

module.exports = StompScreen;
