var midi = require( 'web-midi' )

var inStream = midi.openInput('Launchpad')
var outStream = midi.openOutput('Launchpad')

inStream.on( 'data', function( data ){
  console.log( data )
})

// Clear
outStream.write([176,0,0])

sendMidi([1,1])
sendMidi([2,2])
sendMidi([3,3])
sendMidi([4,4])

function sendMidi( position ) {
  var externalPosition = position[1] * 16 + position[0]
  console.log( externalPosition )
  outStream.write([144, externalPosition, 60])
}
