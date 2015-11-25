var EventEmitter = require('events').EventEmitter
var WebMidi = require( 'web-midi' )

class Midi extends EventEmitter{
  constructor() {
    super()

    this.inStream = null
    this.outStream = null

    this._initStreams()
    this.recieveMidi()

    this.clear()
  }

  clear() {
    this.outStream.write([176,0,0])
  }

  sendMidi( position ) {
    console.log( position )

    if ( position[0] > 7 || position[1] > 7 ) {
      throw new Error( 'Index is out of range' )
    }

    var externalPosition = position[1] * 16 + position[0]
    this.outStream.write([144, externalPosition, 60])
  }

  recieveMidi() {
    var self = this

    this.inStream.on( 'data', function( data ){
      var number = data[1]
      var y = Math.floor(number / 16)
      var x = number - ( y * 16 )

      self.emit( 'recieved', [x,y] )
    })
  }

  _initStreams() {
    try {
      this.inStream = WebMidi.openInput('Launchpad')
      this.outStream = WebMidi.openOutput('Launchpad')
    } catch (err) {
      throw err.message
    }
  }
}

module.exports = Midi
