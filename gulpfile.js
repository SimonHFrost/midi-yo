var gulp = require('gulp')
var Browserify = require('browserify')

var browserify = Browserify();
browserify.add('main.js');

gulp.task('default', function() {
  browserify.bundle().pipe(process.stdout);
});
