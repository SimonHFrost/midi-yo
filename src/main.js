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
    this._initLights()
  }

  bindEvents () {
    this.launchpad.on('recieved', (coordinates) => {
      this.launchpad.output(coordinates)

      setTimeout(() => {
        this.launchpad.output(coordinates, 1)
      }, 100)

      this.scene.createCube(coordinates[0], coordinates[1])
    })
  }

  _initLights () {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        this.launchpad.output([i, j])
      }
    }

    setTimeout(() => { this.launchpad.clear() }, 1000)
  }
}

var main = new Main()
