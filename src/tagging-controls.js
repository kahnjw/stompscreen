function TaggingControls(options) {
  var play = this.play.bind(this);
  this.containerEl = options.controlsEl;
  this.videoEl = options.videoEl;
  this.isPlaying = options.autoplay;

  this.leftBoundPercentage = 0.25;
  this.rightBoundPercentage = 0.75;

  this.setupControls();

  this.videoEl.addEventListener('loadedmetadata', play);
}

TaggingControls.prototype.setupControls = function() {
  /* Tag scrubber setup */
  this.leftBound = document.createElement('button');
  this.rightBound = document.createElement('button');
  this.area = document.createElement('div');
  this.scrubberContainer = document.createElement('div');

  this.scrubberContainer.classList.add('scrubber-container');
  this.scrubberContainer.classList.add('tagger');
  this.leftBound.classList.add('left');
  this.rightBound.classList.add('right');
  this.area.classList.add('area');

  this.scrubberContainer.appendChild(this.area);
  this.scrubberContainer.appendChild(this.leftBound);
  this.scrubberContainer.appendChild(this.rightBound);
  this.containerEl.appendChild(this.scrubberContainer);
};

TaggingControls.prototype.play = function(event) {
  var startTime = this.videoEl.duration*this.leftBoundPercentage;
  console.log(this.leftBoundPercentage);
  console.log(this.videoEl.duration);
  console.log(parseInt(startTime));
  this.videoEl.currentTime = parseInt(startTime);

  this.videoEl.play();
};

module.exports = TaggingControls;
