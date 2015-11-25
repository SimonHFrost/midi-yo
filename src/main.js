var Scene = require( './scene.js' )
var Midi = require( './midi.js' )

var scene = new Scene()
var midi = new Midi()

midi.on( 'recieved', function( data ) {
  console.log( data )
  scene.createCube(data[0], [1])
})

for ( var i = 0; i < 8; i++ ) {
  for ( var j = 0; j < 8; j++ ) {
    midi.sendMidi([i, j])
  }
}

setTimeout( function() { midi.clear() }, 1000 )
