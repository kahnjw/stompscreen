# Stompscreen

[![Build Status](https://travis-ci.org/kahnjw/stompscreen.png)](https://travis-ci.org/kahnjw/stompscreen)

A video player by Stompdrop


## Install it

```sh
$ npm install stompscreen --save
```

## Use it

```javascript
var Stompscreen = require('stompscreen');

var screen = Stompscreen.init({
    el: document.querySelector('video'),
    src: 'my/video/source.mp4',
    autoplay: false,
    width: 720
});
```
