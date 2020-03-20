var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.z = 5;

var group = new THREE.Group();
group.scale.set(3, 1, 2);
scene.add(group)

setPlane("y",  Math.PI * 0.5); //px
setPlane("y", -Math.PI * 0.5); //nx
setPlane("x",  Math.PI * 0.5); //ny
setPlane("y",  0); //pz
setPlane("y",  Math.PI);// nz

function setPlane(axis, angle) {
    let planeGeom = new THREE.PlaneGeometry(1, 1, 1, 1);
    planeGeom.translate(0, 0, 0.5);
    switch (axis) {
      case 'y':
        planeGeom.rotateY(angle);
        break;
      default:
        planeGeom.rotateX(angle);
    }
    let plane = new THREE.Mesh(planeGeom, new THREE.MeshBasicMaterial({color: 0x666666}));
    group.add(plane);
  }

function animate() {
    requestAnimationFrame( animate );
    group.rotation.x += 0.01;
    group.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();