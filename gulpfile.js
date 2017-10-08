'use strict'

// dependencies
const gulp      = require('gulp'),
      sass      = require('gulp-sass'),
      sassGlob  = require('gulp-sass-glob'),
      minifyCSS = require('gulp-clean-css'),
      rename    = require('gulp-rename'),
      concat    = require('gulp-concat'),
      watch     = require('gulp-watch');


/////////////////
// - SCSS/CSS
/////////////////

const SCSS_SRC  = 'src/components/**/*.scss';
const SCSS_DEST = 'src/css';

gulp.task('build_scss', function() {
    return gulp.src('src/components/screen.scss')
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(SCSS_DEST))
});

// Detect changes in SCSS
gulp.task('watch_scss', () => {
    return watch(SCSS_SRC, () => {
        gulp.start('build_scss');
    });
})

// Run tasks
gulp.task('default', ['build_scss', 'watch_scss']);

