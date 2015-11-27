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

  sendMidi( position, value ) {
    if ( position[0] > 7 || position[1] > 7 ) {
      throw new Error( 'Index is out of range' )
    }

    var value = !!value ? value : 60

    var externalPosition = position[1] * 16 + position[0]
    this.outStream.write([144, externalPosition, value])
  }

  recieveMidi() {
    var self = this

    this.inStream.on( 'data', function( data ){
      var number = data[1]
      var y = Math.floor(number / 16)
      var x = number - ( y * 16 )
      var data = [x,y]

      self.sendMidi( data )

      setTimeout( function() {
        self.sendMidi( data, 1 )
      }, 100)

      self.emit( 'recieved', data )
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
