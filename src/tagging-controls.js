var _ = require('lodash');


function TaggingControls(options) {
  var play = this.play.bind(this);

  this.containerEl = options.controlsEl;
  this.videoEl = options.videoEl;
  this.isPlaying = options.autoplay;
  this.muted = options.muted;
  this.videoEl.muted = !! this.muted;

  this.leftBoundPercentage = 0.25;
  this.rightBoundPercentage = 0.75;

  this.setupControls();
  this.setBounds();

  this.videoEl.addEventListener('loadedmetadata', play);
}

TaggingControls.prototype.setupControls = function() {
  var dragBoundLeft;
  var dragBoundRight;
  var dragBoundMousedown = this.dragBoundMousedown.bind(this);

  /* Tag scrubber setup */
  this.leftBound = document.createElement('button');
  this.rightBound = document.createElement('button');
  this.scrubber = document.createElement('button');
  this.area = document.createElement('div');
  this.scrubberContainer = document.createElement('div');

  this.scrubberContainer.classList.add('scrubber-container');
  this.scrubberContainer.classList.add('tagger');
  this.leftBound.classList.add('left');
  this.scrubber.classList.add('scrubber');
  this.rightBound.classList.add('right');
  this.area.classList.add('area');

  this.scrubberContainer.appendChild(this.area);
  this.scrubberContainer.appendChild(this.leftBound);
  this.scrubberContainer.appendChild(this.scrubber);
  this.scrubberContainer.appendChild(this.rightBound);
  this.containerEl.appendChild(this.scrubberContainer);

  dragBoundLeft = _.partial(
    dragBoundMousedown,
    'leftBoundPercentage',
    this.leftBound
  );

  dragBoundRight = _.partial(
    dragBoundMousedown,
    'rightBoundPercentage',
    this.rightBound
  );

  this.leftBound.addEventListener('mousedown', dragBoundLeft);
  this.rightBound.addEventListener('mousedown', dragBoundRight);
};

TaggingControls.prototype.play = function(event) {
  var handleTimeUpdate = function(event) {
    var currentTime = this.videoEl.currentTime;
    var duration = this.videoEl.duration;
    var currentPercent = currentTime / duration;

    this.scrubber.style.left = currentPercent*100 + '%';
    console.log(currentPercent, this.rightBoundPercentage);
    if(currentPercent >= this.rightBoundPercentage) {
      this.videoEl.currentTime = this.videoEl.duration*this.leftBoundPercentage;
    }
  };

  var boundHandleTimeUpdate = handleTimeUpdate.bind(this);
  var startTime = this.videoEl.duration*this.leftBoundPercentage;

  this.videoEl.currentTime = parseInt(startTime);
  this.videoEl.addEventListener('timeupdate', boundHandleTimeUpdate);
  this.videoEl.play();
};

TaggingControls.prototype.setBounds = function(event) {
  /* Bound scrubbers */
  this.setBoundPosLeft(this.leftBoundPercentage, this.leftBound);
  this.setBoundPosRight(this.rightBoundPercentage, this.rightBound);

  /* Area container */
  this.setBoundPosLeft(this.leftBoundPercentage, this.area);
  this.setBoundPosRight(this.rightBoundPercentage, this.area);
};

TaggingControls.prototype.setBoundPosLeft = function(percentage, node) {
  var normPercentage = percentage*100;

  node.style.left = normPercentage + '%';
};

TaggingControls.prototype.setBoundPosRight = function(percentage, node) {
  var normPercentage = 100 - percentage*100;

  node.style.right = normPercentage + '%';
};

TaggingControls.prototype.dragBoundMousedown = function(percentage, node, event) {
  var removeEvents = function() {
    document.body.removeEventListener('mousemove', calcNewPercent);
    document.body.removeEventListener('mouseup', removeEvents);
  };

  var boundCalcNewPercent = this.calcNewPercent.bind(this);
  var calcNewPercent = _.partial(boundCalcNewPercent, percentage, node);

  document.body.addEventListener('mousemove', calcNewPercent);
  document.body.addEventListener('mouseup', removeEvents);
};

TaggingControls.prototype.calcNewPercent = function(percentage, node, event) {
  var containerRect = this.scrubberContainer.getBoundingClientRect();
  var newPosition = event.pageX - containerRect.left;
  var progressAsPercent = newPosition / this.scrubberContainer.offsetWidth;

  this[percentage] = progressAsPercent;
  this.setBounds(event);
};
module.exports = TaggingControls;
