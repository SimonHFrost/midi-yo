var Scene = require( './scene.js' )
var Launchpad = require( './launchpad.js' )

var scene = new Scene()
var midi = new Launchpad()

midi.on( 'recieved', function( coordinates ) {
  midi.sendMidi( coordinates )

  setTimeout( function() {
    midi.sendMidi( coordinates, 1 )
  }, 100)

  // NOTE: Invert y axis, since launchpad and threejs are opposite
  scene.createCube(coordinates[0], coordinates[1])
})

for ( var i = 0; i < 8; i++ ) {
  for ( var j = 0; j < 8; j++ ) {
    midi.sendMidi([i, j])
  }
}

setTimeout( function() { midi.clear() }, 1000 )
