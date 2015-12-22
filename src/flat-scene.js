class FlatScene {
  constructor () {
    var two = new window.Two({
      fullscreen: true,
      autostart: true
    }).appendTo(document.body)

    this.bindEvents()

    this.domElement = two.renderer.domElement
    this.domElement.classList.add('two-renderer')

    var rect = two.makeRectangle(two.width / 2, two.height / 2, 50, 50)
    two.bind('update', function () {
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
}

module.exports = FlatScene
