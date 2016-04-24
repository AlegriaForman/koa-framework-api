'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var paths = ['*.js', '**/*.js', '!node_modules/**', '!**/db/*'];

gulp.task('lint:test', () => {
  return gulp.src('./test/**/*test.js')
  .pipe(eslint({
    envs: [
      'mocha',
      'es6'
    ]
  }))
    .pipe(eslint.format());
});

gulp.task('lint:nontest', () => {
  return gulp.src(paths)
    .pipe(eslint({
      envs: [
        'es6'
      ]
    }))
    .pipe(eslint.format());
});

gulp.task('mocha:test', () => {
  gulp.src('./test/**/*test.js')
   .pipe(mocha());
});

gulp.task('watch', () => {
  gulp.watch(paths, ['lint:test', 'lint:nontest']);
});

gulp.task('default', ['lint:test', 'lint:nontest', 'mocha:test']);
