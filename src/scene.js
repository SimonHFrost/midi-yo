var THREE = require('three.js')

class Scene {
  constructor () {
    this.bindEvents()
    this._init()
    this._animate()
  }

  createCube (x, y) {
    y = 7 - y

    var size = Scene.SIZE
    var geometry = new THREE.BoxGeometry(size, size, size)

    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    var mesh = new THREE.Mesh(geometry, material)

    mesh.position.x = x * size - Scene.OFFSET
    mesh.position.y = y * size - Scene.OFFSET

    this.scene.add(mesh)
    return mesh
  }

  removeCube (cube) {
    this.scene.remove(cube)
  }

  bindEvents () {
    window.addEventListener('keypress', (event) => {
      var key = String.fromCharCode(event.which)

      if (key === '2') {
        this.domElement.classList.toggle('hide')
      }

      if (key === 'a') {
        this.camera.rotation.y -= 0.01
      }

      if (key === 'd') {
        this.camera.rotation.y += 0.01
      }
    })
  }

  _init () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(75, Scene.WIDTH / Scene.HEIGHT, 1, 10000)
    this.camera.position.z = 2000

    this.clock = new THREE.Clock()

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(Scene.WIDTH, Scene.HEIGHT)

    this.domElement = this.renderer.domElement
    this.domElement.classList.add('three-renderer')

    document.body.appendChild(this.domElement)
  }

  _animate () {
    // Can use clock delta here
    // this.clock.getDelta()
    window.requestAnimationFrame(this._animate.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

Scene.WIDTH = window.innerWidth
Scene.HEIGHT = window.innerHeight
Scene.OFFSET = 800
Scene.SIZE = 200

module.exports = Scene
