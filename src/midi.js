// Midi Example

var midi = require( 'web-midi' )
var inStream = midi.openInput('Launchpad')
var outStream = midi.openOutput('Launchpad')

inStream.on( 'data', function( data ){
  console.log( data )
  // => [146, 32, 127]
})

// send on note
outStream.write([146, 38, 127])

setTimeout(function(){
  // off note
  outStream.write([146, 38, 0])
}, 1000)

// or use pipes
// var anotherStream = midi.openOutput('IAC')
// inStream.pipe(anotherStream)
