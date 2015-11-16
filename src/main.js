var Scene = require( './scene.js' )
var Midi = require( './midi.js' )

var scene = new Scene()
var midi = new Midi()

midi.on( 'recieved', function( data ) {
  console.log( data )
})

midi.sendMidi([1,1])
midi.sendMidi([2,2])
midi.sendMidi([3,3])
midi.sendMidi([4,4])
