'use strict'

// dependencies
const gulp      = require('gulp'),
      sass      = require('gulp-sass'),
      sassGlob  = require('gulp-sass-glob'),
      minifyCSS = require('gulp-clean-css'),
      rename    = require('gulp-rename'),
      concat    = require('gulp-concat');


/////////////////
// - SCSS/CSS
/////////////////

const SCSS_SRC  = './src/styles/scss/**/*.scss';
const SCSS_DEST = './src/styles/css';

gulp.task('build-scss', function() {
    return gulp.src(SCSS_SRC)
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(SCSS_DEST))
});

// Detect changes in SCSS
gulp.task('watch_scss', () => {
    gulp.watch(SCSS_SRC, ['build-scss']);
})

// Run tasks
gulp.task('default', ['watch_scss']);

