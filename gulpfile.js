'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');


gulp.task('less', function() {
  return gulp.src('src/less/main.less')
    .pipe(less())
    .pipe(minifyCss())
    .pipe(gulp.dest('build/less'));
});

gulp.task('exampleless', function() {
  return gulp.src('src/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('examples/less'));
});

gulp.task('buildJs', function() {
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

gulp.task('reload', ['examplebuild', 'exampleless'], function() {
  gulp.src('./src/*')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./src/**/*'], ['reload']);
});

gulp.task('connect', ['examplebuild', 'exampleless', 'watch'], function() {
  connect.server({
    root: ['examples', 'build', 'static'],
    port: 9065,
    livereload: true
  });
});

gulp.task('build', ['buildJs', 'less']);
