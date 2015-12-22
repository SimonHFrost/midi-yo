var Scene = require('./scene.js')
var FlatScene = require('./flat-scene.js')
var Launchpad = require('./launchpad.js')

class Main {
  constructor () {
    if (window.location.search.match('debug=true')) {
      console.log('DEBUG MODE ENABLED')
      window.debug = true
    }

    this.scene = new Scene()
    this.flatScene = new FlatScene()
    this.launchpad = new Launchpad()

    this.bindEvents()
    this.initLights()
  }

  bindEvents () {
    var self = this

    this.launchpad.on('recieved', function (coordinates) {
      self.launchpad.output(coordinates)

      setTimeout(function () {
        self.launchpad.output(coordinates, 1)
      }, 100)

      self.scene.createCube(coordinates[0], coordinates[1])
    })
  }

  initLights () {
    var self = this

    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        this.launchpad.output([i, j])
      }
    }

    setTimeout(function () { self.launchpad.clear() }, 1000)
  }
}

var main = new Main()
