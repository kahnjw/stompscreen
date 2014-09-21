!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.StompScreen=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var StompScreenPrototype = require('./stompscreen');

var StompScreen = {
  init: function(options) {
    return new StompScreenPrototype(options);
  }
};

module.exports = StompScreen;

},{"./stompscreen":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./controls":2}]},{},[1])(1)
});