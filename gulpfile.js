// Include Gulp & tools

var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var watch       = require('gulp-watch');
var haml        = require('gulp-haml');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var reload      = browserSync.reload;


// HAML

gulp.task('haml', function(){
  return gulp.src('app/index.haml')
    .pipe(haml())
    .pipe(gulp.dest('./build'));
});


// SASS

gulp.task('sass', function () {
  return gulp.src('./app/sass/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./build/css'));
});


// Lint JavaScript

gulp.task('hint', function(){
  return gulp.src('./app/js/**/*.js')
    .pipe(jshint())
    .pipe(gulp.dest('./build/js'))
    .pipe(jshint.reporter('default'));
});


// Watch Files & Reload

gulp.task('serve', function(){
  browserSync({
    server: {
      baseDir: "./build"
    }
  });

  gulp.watch(['./app/index.haml'], ['haml', reload]);
  gulp.watch('./app/sass/**/*.scss', ['sass', reload]);
  gulp.watch('./app/js/**/*.js', ['hint', reload]);
});


// Watch Files For Changes

gulp.task('default', function(){

  runSequence('haml', 'hint', 'sass')

});
