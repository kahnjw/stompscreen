'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');


gulp.task('build', function() {
  return browserify('./src/index')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('examplebuild', function() {
    return browserify({
        basedir: './src/',
        standalone: 'StompScreen'
      })
      .add('./index')
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./examples/build/js/'));
});

gulp.task('connect', ['examplebuild'], function() {
  connect.server({
    root: ['examples', 'build'],
    port: 9065,
    livereload: true
  });
});
