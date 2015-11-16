var midi = require( 'web-midi' )

var inStream = midi.openInput('Launchpad')
var outStream = midi.openOutput('Launchpad')

outStream.write([176,0,0])

inStream.on( 'data', function( data ){
  console.log( data )
})

// send on note
outStream.write([146, 38, 127])

setTimeout(function(){
  outStream.write([146, 38, 0])
}, 1000)
