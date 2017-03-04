let Scene = require('./scene.js')
let FlatScene = require('./flat-scene.js')
let Launchpad = require('./launchpad.js')

class Main {
  constructor () {
    if (window.location.search.match('debug=true')) {
      console.log('DEBUG MODE')
      window.debug = true
    }

    this.scene = new Scene()
    this.flatScene = new FlatScene()
    this.launchpad = new Launchpad()

    this.bindEvents()
    this.launchpad.clear()
  }

  bindEvents () {
    this.launchpad.on('recieved', (coordinates) => {
      // this.launchpad.output(coordinates, 60)
      let cube = this.scene.createCube(coordinates[0], coordinates[1])
      let square = this.flatScene.createSquare(coordinates[0], coordinates[1])

      setTimeout(() => {
        // this.launchpad.output(coordinates)
        this.scene.removeCube(cube)
        this.flatScene.removeSquare(square)
      }, 100)
    })
  }

}

/*eslint-disable*/
let main = new Main()
