class FlatScene {
  constructor () {
    var two = new window.Two({
      fullscreen: true,
      autostart: true
    }).appendTo(document.body)

    two.renderer.domElement.classList.add('two-renderer')
    var rect = two.makeRectangle(two.width / 2, two.height / 2, 50, 50)
    two.bind('update', function () {
      rect.rotation += 0.001
    })
  }
}

module.exports = FlatScene
