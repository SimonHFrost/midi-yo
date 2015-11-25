var THREE = require('three.js')

class Scene {
  constructor() {
    this.scene = null
    this.camera = null
    this.renderer = null

    this._init()
    this._animate()
  }

  createCube(x, y) {
    var geometry = new THREE.BoxGeometry(200, 200, 200)

    var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    var mesh = new THREE.Mesh(geometry, material)

    mesh.position.x = x * 200
    mesh.position.y = y * 200

    this.scene.add(mesh)
  }

  _init() {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(75, Scene.WIDTH / Scene.HEIGHT, 1, 10000)
    this.camera.position.z = 1000

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(Scene.WIDTH, Scene.HEIGHT)

    document.body.appendChild(this.renderer.domElement)
  }

  _animate() {
    window.requestAnimationFrame(this._animate.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

Scene.WIDTH = window.innerWidth
Scene.HEIGHT = window.innerHeight

module.exports = Scene
