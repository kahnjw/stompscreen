function Controls(containerEl) {
  this.containerEl = containerEl;

  this.setupControls();
}

Controls.prototype.setupControls = function() {
  this.playPause = document.createElement('button');
  this.scrubberContainer = document.createElement('div');

  this.containerEl.appendChild(this.playPause);
  this.containerEl.appendChild(this.scrubberContainer);
};

module.exports = Controls;
