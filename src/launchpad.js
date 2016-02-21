var EventEmitter = require('events').EventEmitter
var WebMidi = require('web-midi')

class Launchpad extends EventEmitter {
  constructor () {
    super()

    this.inStream = null
    this.outStream = null

    this._initStreams()
    this.bindEvents()

    this.clear()
  }

  clear () {
    this.outStream.write([176, 0, 0])
  }

  output (position, value) {
    if (position[0] > 7 || position[1] > 7) {
      return // Fail graciously if out of bounds
    }

    var newValue = value || 0
    var externalPosition = position[1] * 16 + position[0]
    this.outStream.write([144, externalPosition, newValue])
  }

  bindEvents () {
    this.inStream.on('data', (data) => {
      if (data[2] === 0) { // Ignore the off signal
        return
      }

      var midiNumber = data[1]
      var scaled = (midiNumber - 36)

      var y = Math.floor(scaled / 4)
      var x = scaled - (y * 4)
      var coordinates = [x, y]

      if (coordinates[1] > 7) {
        coordinates[0] = coordinates[0] + 4
        coordinates[1] = coordinates[1] - 8
      }

      // Invert coordinates
      coordinates[1] = 7 - coordinates[1]

      console.log(coordinates)

      // The following is normal mode of launchpad

      // var y = Math.floor(midiNumber / 16)
      // NOTE: Invert y axis, since launchpad and threejs are opposite
      // var x = midiNumber - (y * 16)
      // var coordinates = [x, y]

      this.emit('recieved', coordinates)
    })
  }

  _initStreams () {
    try {
      this.inStream = WebMidi.openInput('Launchpad')
      this.outStream = WebMidi.openOutput('Launchpad')
    } catch (error) {
      window.alert('No launchpad found')
    }
  }
}

module.exports = Launchpad
