var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var browserify = require('browserify')
var watchify = require('watchify')
var babel = require('babelify')

function compile (watch) {
  var bundler = watchify(
    browserify('./src/main.js', {
      debug: true
    })
      .transform(babel))

  function rebundle () {
    bundler.bundle()
      .on('error', function (err) {
        console.error(err)
        this.emit('end')
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'))
  }

  if (watch) {
    bundler.on('update', function (fileChanged) {
      console.log(fileChanged + ' changed')
      rebundle()
    })
  }

  rebundle()
}

gulp.task('bundle', function () { return compile(false) })
gulp.task('watch', function () { return compile(true) })

gulp.task('default', ['watch'])
