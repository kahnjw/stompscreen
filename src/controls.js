function Controls(options) {
  this.containerEl = options.controlsEl;
  this.videoEl = options.videoEl;
  this.isPlaying = options.autoplay;

  this.setupControls();
}

Controls.prototype.setupControls = function() {
  var handlePlayPause = this.handlePlayPause.bind(this);
  var handleFullscreen = this.handleFullscreen.bind(this);
  var handleTimeUpdate = this.handleTimeUpdate.bind(this);
  var handleScrubberMouseDown = this.handleScrubberMouseDown.bind(this);
  var handleTagToggle = this.handleTagToggle.bind(this);

  /* Play pause setup */
  this.playPause = document.createElement('button');
  this.playPause.classList.add('play-pause');

  if(this.isPlaying) {
    this.playPause.classList.add('pause')
  } else {
    this.playPause.classList.add('play');
  }

  /* Tag toggle setup */
  this.tagToggle = document.createElement('button');
  this.tagToggle.classList.add('tag-toggle');

  /* Fullscreen setup */
  this.fullscreen = document.createElement('button');
  this.fullscreen.classList.add('fullscreen');

  /* Button container setup */
  this.buttonsRight = document.createElement('span');
  this.buttonsLeft = document.createElement('span');
  this.buttonContainer = document.createElement('div');
  this.buttonsRight.classList.add('buttons-right');
  this.buttonsLeft.classList.add('buttons-left');

  /* Scrubber setup */
  this.scrubber = document.createElement('button');
  this.scrubberProgress = document.createElement('div');
  this.scrubberContainer = document.createElement('div');
  this.scrubberContainer.appendChild(this.scrubberProgress);
  this.scrubberContainer.appendChild(this.scrubber);
  this.scrubberContainer.classList.add('scrubber-container');
  this.scrubberProgress.classList.add('scrubber-progress');
  this.buttonContainer.classList.add('button-container');

  /* Event setup */
  this.playPause.addEventListener('click', handlePlayPause);
  this.videoEl.addEventListener('timeupdate', handleTimeUpdate);
  this.scrubber.addEventListener('mousedown', handleScrubberMouseDown);
  this.scrubberContainer.addEventListener('mousedown', handleScrubberMouseDown);
  this.fullscreen.addEventListener('click', handleFullscreen);
  this.tagToggle.addEventListener('click', handleTagToggle);

  /* Append to parent */
  this.containerEl.appendChild(this.scrubberContainer);
  this.buttonsLeft.appendChild(this.playPause);
  this.buttonsRight.appendChild(this.tagToggle);
  this.buttonsRight.appendChild(this.fullscreen);
  this.buttonContainer.appendChild(this.buttonsLeft);
  this.buttonContainer.appendChild(this.buttonsRight);
  this.containerEl.appendChild(this.buttonContainer);
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
  var scrubberLeftPx = currentPercent*this.scrubberContainer.offsetWidth;

  this.scrubber.style.left = scrubberLeftPx  - currentPercent*14 + 'px';
  this.scrubberProgress.style.width = scrubberLeftPx + 'px';
};

Controls.prototype.handleScrubberMouseDown = function(event) {
  var handleSeek = this.handleSeek.bind(this);
  var wasPlaying = this.pauseIfPlaying();

  var handleMouseUp = function(event) {
    document.body.removeEventListener('mousemove', handleSeek);
    document.body.removeEventListener('mouseup', handleMouseUpBound);

    if(wasPlaying) {
      this.videoEl.play();
    }
  };

  var handleMouseUpBound = handleMouseUp.bind(this);

  document.body.addEventListener('mouseup', handleMouseUpBound);
  document.body.addEventListener('mousemove', handleSeek);

  handleSeek(event);
};

Controls.prototype.handleSeek = function(event) {
  var containerRext = this.scrubberContainer.getBoundingClientRect();
  var newPosition = event.pageX - containerRext.left;
  var progressAsPercent = newPosition / this.scrubberContainer.offsetWidth;

  if(progressAsPercent <= 1.0 && progressAsPercent >= 0) {
    this.videoEl.currentTime = progressAsPercent*this.videoEl.duration;
    this.scrubber.style.left =  newPosition - progressAsPercent*14 + 'px';
    this.scrubberProgress.style.width = newPosition + 'px';
  }
};

Controls.prototype.handleFullscreen = function() {
  if (this.videoEl.requestFullscreen) {
    this.videoEl.requestFullscreen();
  } else if (this.videoEl.msRequestFullscreen) {
    this.videoEl.msRequestFullscreen();
  } else if (this.videoEl.mozRequestFullScreen) {
    this.videoEl.mozRequestFullScreen();
  } else if (this.videoEl.webkitRequestFullscreen) {
    this.videoEl.webkitRequestFullscreen();
  }
};

Controls.prototype.handleTagToggle = function() {};

Controls.prototype.pauseIfPlaying = function() {
  if(this.isPlaying) {
    this.videoEl.pause();
  }

  return this.isPlaying;
};


module.exports = Controls;
