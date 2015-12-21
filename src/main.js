var Scene = require('./scene.js')
var Launchpad = require('./launchpad.js')

var scene = new Scene()
var launchpad = new Launchpad()

launchpad.on('recieved', function (coordinates) {
  launchpad.send(coordinates)

  setTimeout(function () {
    launchpad.send(coordinates, 1)
  }, 100)

  scene.createCube(coordinates[0], coordinates[1])
})

for (var i = 0; i < 8; i++) {
  for (var j = 0; j < 8; j++) {
    launchpad.send([i, j])
  }
}

setTimeout(function () { launchpad.clear() }, 1000)
