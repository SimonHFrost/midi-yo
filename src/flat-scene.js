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
    var square = this.two.makeRectangle(x * 100 + 100, y * 100 + 100, 50, 50)
    this.two.update()
    return square
  }

  removeSquare (square) {
    this.two.remove(square)
  }

  _init () {
    // TODO: Look at using 'two.clean.js' https://github.com/jonobr1/two.js/issues/43
    this.two = new window.Two({
      fullscreen: true,
      autostart: true
    }).appendTo(document.body)

    this.domElement = this.two.renderer.domElement
    this.domElement.classList.add('two-renderer')
  }
}

module.exports = FlatScene
