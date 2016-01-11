class FlatScene {
  constructor () {
    this.two = new window.Two({
      fullscreen: true,
      autostart: true
    }).appendTo(document.body)

    this.bindEvents()

    this.domElement = this.two.renderer.domElement
    this.domElement.classList.add('two-renderer')

    var rect = this.two.makeRectangle(this.two.width / 2, this.two.height / 2, 50, 50)
    this.two.bind('update', function () {
      rect.rotation += 0.001
    })
  }

  bindEvents () {
    window.addEventListener('keypress', (event) => {
      if (String.fromCharCode(event.which) === '1') {
        this.domElement.classList.toggle('hide')
      }
    })
  }

  createSquare(x, y) {
    var circle = this.two.makeCircle(x * 100 + 100, y * 100 + 100, 50);
    this.two.update()
  }
}

module.exports = FlatScene
