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

## Development

Install dependencies:

```sh
$ npm install
```

Run the tests:

```sh
$ npm test
```

Run the dev server.

```sh
node_modules/gulp/bin.gulp.js connect
```

You'll also need to add a video file to serve up during local development. Change the
path in [example-1.html](https://github.com/kahnjw/stompscreen/blob/master/examples/example-1.html).
