var THREE = require('three.js')

class Scene {
  constructor () {
    this._init()
    this._animate()
  }

  createCube (x, y) {
    y = 7 - y

    var size = Scene.SIZE
    var geometry = new THREE.BoxGeometry(size, size, size)

    var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    var mesh = new THREE.Mesh(geometry, material)

    mesh.position.x = x * size - Scene.OFFSET
    mesh.position.y = y * size - Scene.OFFSET

    console.log(mesh.position)

    this.scene.add(mesh)
  }

  _init () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(75, Scene.WIDTH / Scene.HEIGHT, 1, 10000)
    this.camera.position.z = 2000

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(Scene.WIDTH, Scene.HEIGHT)

    this.renderer.domElement.classList.add('three-renderer')
    document.body.appendChild(this.renderer.domElement)
  }

  _animate () {
    window.requestAnimationFrame(this._animate.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

Scene.WIDTH = window.innerWidth
Scene.HEIGHT = window.innerHeight
Scene.OFFSET = 800
Scene.SIZE = 200

module.exports = Scene
