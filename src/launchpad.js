let EventEmitter = require('events').EventEmitter

var MidiStream = require('midi-stream')
var MidiController = require('midi-controller')

var colors = {
  green: 60,
  red: 13,
  amber: 63,
  amberLow: 29
}

class Launchpad extends EventEmitter {
  constructor () {
    super()

    this.duplexStream = new MidiStream('Launchpad')
    this.launchpad = new MidiController(this.duplexStream)

    this.bindEvents()

    this.clear()
  }

  clear () {
    this.duplexStream.write([176, 0, 0])
  }

  bindEvents () {
      // map launchpad grid to chromatic midi notes (starting at 30)
    var mapping = []
    var offset = 30
    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
        var id = (y * 16) + x
        mapping.push([
          [144, id],       // input midi message
          [144, offset++]  // output midi message
        ])
      }
    }

    var noteMatrix = this.launchpad.createNoteMatrix(mapping, colors.amber)
    noteMatrix.on('data', function (midiNote) {
      if (midiNote[2]) { // note on
        noteOn(midiNote[1])
      } else { // note off
        noteOff(midiNote[1])
      }
    })

    noteMatrix.pipe(noteMatrix) // echo the notes back to light up buttons

    // TODO Fix this hack
    var that = this

    // screen synth
    var onNotes = {}
    function noteOn (note) {
      onNotes[note] = setInterval(function () {
        console.log(note)
        that.emit('recieved', [5, note % 5])
      }, 50)
    }

    function noteOff (note) {
      if (onNotes[note]) {
        clearInterval(onNotes[note])
        onNotes[note] = null
      }
    }
  }
}

module.exports = Launchpad
