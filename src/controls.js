function Controls(options) {
  this.containerEl = options.controlsEl;
  this.videoEl = options.videoEl;
  this.isPlaying = options.autoplay;

  this.setupControls();
}

Controls.prototype.setupControls = function() {
  var handlePlayPause = this.handlePlayPause.bind(this);
  var handleTimeUpdate = this.handleTimeUpdate.bind(this);
  var handleScubberMouseDown = this.handleScubberMouseDown.bind(this);

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
  this.scrubber.addEventListener('mousedown', handleScubberMouseDown);

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
  var scrubberLeftPx = currentPercent*this.scrubberContainer.offsetWidth + 'px';

  this.scrubber.style.left = scrubberLeftPx;
};

Controls.prototype.handleScubberMouseDown = function(event) {
  var handleSeek = this.handleSeek.bind(this);
  var wasPlaying = this.pauseIfPlaying();
  var handleMouseUp = function(event) {
    document.body.removeEventListener('mousemove', handleSeek);
    document.body.removeEventListener('mouseup', handleMouseUp);

    if(wasPlaying) {
      this.videoEl.play();
    }
  };

  document.body.addEventListener('mouseup', handleMouseUp.bind(this));
  document.body.addEventListener('mousemove', handleSeek);
};

Controls.prototype.handleSeek = function(event) {
  var containerRext = this.scrubberContainer.getBoundingClientRect();
  var newPosition = event.pageX - containerRext.left;
  var progressAsPercent = newPosition / this.scrubberContainer.offsetWidth;

  if(progressAsPercent <= 1.0 && progressAsPercent >= 0) {
    this.videoEl.currentTime = progressAsPercent*this.videoEl.duration;
    this.scrubber.style.left =  newPosition + 'px';
  }
};

Controls.prototype.pauseIfPlaying = function() {
  if(this.isPlaying) {
    this.videoEl.pause();
  }

  return this.isPlaying;
};


module.exports = Controls;
