var gulp = require('gulp')
var Browserify = require('browserify')
var babelify = require('babelify')

var browserify = Browserify()
browserify.add('main.js')

gulp.task('default', function() {
  browserify.transform(babelify)
            .bundle()
            .pipe(process.stdout)
});
