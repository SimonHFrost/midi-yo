var THREE = require( 'three.js' )

class Scene {
  constructor() {
    this.scene = ''
    this.camera = ''
    this.renderer = ''
    this.mesh = ''
  }

  init() {
    var geometry = new THREE.BoxGeometry( 200, 200, 200 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    this.mesh = new THREE.Mesh( geometry, material );

    this.scene = new THREE.Scene();
    this.scene.add( this.mesh );

    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z = 1000;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( this.renderer.domElement );
  }

  animate() {
    requestAnimationFrame( this.animate.bind(this) );

    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;

    this.renderer.render( this.scene, this.camera );
  }
}

module.exports = Scene
