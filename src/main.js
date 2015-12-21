var Scene = require('./scene.js')
var Launchpad = require('./launchpad.js')

if ( location.search.match( 'debug=true' ) ) {
  console.log('DEBUG MODE ENABLED')
  window.debug = true
}

var scene = new Scene()
var launchpad = new Launchpad()

launchpad.on('recieved', function (coordinates) {
  launchpad.output(coordinates)

  setTimeout(function () {
    launchpad.output(coordinates, 1)
  }, 100)

  scene.createCube(coordinates[0], coordinates[1])
})

for (var i = 0; i < 8; i++) {
  for (var j = 0; j < 8; j++) {
    launchpad.output([i, j])
  }
}

setTimeout(function () { launchpad.clear() }, 1000)
