var midi = require( 'web-midi' )

class Midi {
  constructor() {
    this.inStream = null
    this.outStream = null

    this._initStreams()

    // Clear launchpad
    this.outStream.write([176,0,0])
  }

  sendMidi( position ) {
    var externalPosition = position[1] * 16 + position[0]
    console.log( externalPosition )
    this.outStream.write([144, externalPosition, 60])
  }

  _initStreams() {
    this.inStream = midi.openInput('Launchpad')
    this.outStream = midi.openOutput('Launchpad')

    this.inStream.on( 'data', function( data ){
      console.log( data )
    })
  }
}

module.exports = Midi
