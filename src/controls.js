function Controls(options) {
  this.containerEl = options.controlsEl;
  this.videoEl = options.videoEl;
  this.isPlaying = options.autoplay;

  this.setupControls();
}

Controls.prototype.setupControls = function() {
  var handlePlayPause = this.handlePlayPause.bind(this);
  var handleTimeUpdate = this.handleTimeUpdate.bind(this);

  /* Play pause setup */
  this.playPause = document.createElement('button');
  this.playPause.classList.add('play-pause');

  if(this.isPlaying) {
    this.playPause.classList.add('pause')
  } else {
    this.playPause.classList.add('play');
  }

  /* Scrubber setup */
  this.scrubber = document.createElement('button');
  this.scrubberContainer = document.createElement('div');
  this.scrubberContainer.appendChild(this.scrubber);
  this.scrubberContainer.classList.add('scrubber-container');

  /* Event setup */
  this.playPause.addEventListener('click', handlePlayPause);
  this.videoEl.addEventListener('timeupdate', handleTimeUpdate);

  /* Append to parent */
  this.containerEl.appendChild(this.scrubberContainer);
  this.containerEl.appendChild(this.playPause);
};

Controls.prototype.handlePlayPause = function(event) {
  if(this.isPlaying) {
    this.videoEl.pause();
    this.playPause.classList.remove('pause');
    this.playPause.classList.add('play');
  } else {
    this.videoEl.play();
    this.playPause.classList.remove('play');
    this.playPause.classList.add('pause');
  }

  this.isPlaying = ! this.isPlaying;
};

Controls.prototype.handleTimeUpdate = function(event) {
  var currentTime = this.videoEl.currentTime;
  var duration = this.videoEl.duration;

  var currentPercent = currentTime / duration;

  this.scrubber.style.left = (currentPercent * 100) + '%';
};

Controls.prototype.handleSeek = function() {};


module.exports = Controls;
