// Include Gulp & tools

var gulp        = require('gulp');
var del         = require('del');
var jshint      = require('gulp-jshint');
var watch       = require('gulp-watch');
var haml        = require('gulp-haml');
var sass        = require('gulp-sass');
var imagemin    = require('gulp-imagemin');
var pngquant    = require('imagemin-pngquant');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var concat      = require('gulp-concat');
var reload      = browserSync.reload;
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');

// HAML

gulp.task('haml', function() {
  return gulp.src('app/index.haml')
    .pipe(haml())
    .pipe(gulp.dest('./build'));
});


// SASS

gulp.task('sass', function () {
  return gulp.src('./app/styles/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./build/styles'));
});


// Lint JavaScript

gulp.task('jshint', function(){
  return gulp.src('./app/js/**/*.js')
    .pipe(jshint())
    .pipe(gulp.dest('./build/js'))
    .pipe(jshint.reporter('default'));
});


// Browserify

gulp.task('browserify', function() {
  return browserify('./app/js/app.js')
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/js'));
});


// Images Min Task

gulp.task('images', function () {
  return gulp.src('./app/images/**')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./build/images'));
});


// Copy bower_components

gulp.task('copy:bower_components', function() {
  return gulp.src('./app/bower_components/**/*')
    .pipe(gulp.dest('./build/bower_components'));
});


// Copy Data

gulp.task('copy:data', function() {
  return gulp.src('./app/data/**/*')
    .pipe(gulp.dest('./build/data'));
});


// Watch Files & Reload

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: "./build"
    }
  });

  gulp.watch(['./app/index.haml'], ['haml', reload]);
  gulp.watch('./app/styles/**/*.scss', ['sass', reload]);
  gulp.watch('./app/js/**/*.js', ['jshint', 'browserify', reload]);
});


// Clean the Build Output Directory

gulp.task('clean', function() {
  del(['build/*']);
});


// Build

gulp.task('build', ['clean'], function() {
  runSequence('haml', 'sass', 'images', 'jshint', 'copy:bower_components', 'copy:data')
});


// Gulp Default

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
