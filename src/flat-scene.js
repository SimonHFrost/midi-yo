class FlatScene {
  constructor () {
    this.bindEvents()
    this._init()
  }

  bindEvents () {
    window.addEventListener('keypress', (event) => {
      if (String.fromCharCode(event.which) === '1') {
        this.domElement.classList.toggle('hide')
      }
    })
  }

  createSquare (x, y) {
    this.two.makeRectangle(x * 100 + 100, y * 100 + 100, 50, 50)
    this.two.update()
  }

  _init () {
    this.two = new window.Two({
      fullscreen: true,
      autostart: true
    }).appendTo(document.body)

    this.domElement = this.two.renderer.domElement
    this.domElement.classList.add('two-renderer')
  }
}

module.exports = FlatScene
