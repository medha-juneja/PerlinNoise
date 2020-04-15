var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xa0a0a0 );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.z = 5;

var light1 = new THREE.AmbientLight( 0x1743a3 );
scene.add( light1 );

light2 = new THREE.PointLight( 0xffcc77, 1.0);
scene.add(light2);
light2.position.z = 3;
light2.position.x = 4;
light2.position.y = 2;
// var plh2 = new THREE.PointLightHelper(light2,1);
// scene.add(plh2);

var light3 = new THREE.PointLight( 0xffcc77, 1);
scene.add(light3);
light3.position.z = 0;
light3.position.x = -3;
light3.position.y = 1;

// var plh = new THREE.PointLightHelper(light3,1);
// scene.add(plh);

var light4 = new THREE.PointLight( 0xffcc77, 1);
scene.add(light4);
light4.position.z = 5;
light4.position.x = 0;
light4.position.y = 0;
// var plh3 = new THREE.PointLightHelper(light4,1);
// scene.add(plh3);

var plane_geometry = new THREE.PlaneGeometry(1,1,99,99);
plane_geometry.translate(0,0,0.5)
var perlinplane = new THREE.SceneUtils.createMultiMaterialObject( 
                plane_geometry, [new THREE.MeshPhongMaterial({color: 0x80461b, specular: 0x3a243b, flatShading: 1, shininess: 2})
        ]);

function octave(noise, nx,ny,numOctaves, planewidth, planeheight){
    let val = 0;
    let freq = 0;
    let max = 0;
    let amp = 0.5;
    for(let i=0; i < numOctaves; i++) {
        val += noise.simplex2((nx+freq)/planewidth,ny/planeheight)*amp;
        max += amp;
        amp /= 2;
        freq  += 200;
        planewidth /= 2;
        planeheight /=2;
    }
    return Math.abs(val/max);
}

noise.seed(Math.random());
for(var i=1;i<99;i++) {
  for(var j=1;j<99;j++) {
    plane_geometry.vertices[i+j*100].z = 0.3 + octave(noise, i, j, 4, 100,100)
  }
}

function setPlane(axis, angle) {
  let planeGeom = new THREE.PlaneGeometry(0, 0, 1, 1);
  planeGeom.translate(0, 0, 0.5);
  switch (axis) {
    case 'y':
      planeGeom.rotateY(angle);
      break;
    default:
      planeGeom.rotateX(angle);
  }
  let plane = new THREE.SceneUtils.createMultiMaterialObject( 
    planeGeom, [new THREE.MeshPhongMaterial({color: 0x80461b, specular: 0x3a243b, flatShading: 1, shininess: 2})
]);
  group.add(plane);
}

var group = new THREE.Group();
group.add(perlinplane)
scene.add(group)
group.scale.set(1.5, 1.5, 1.5)

setPlane("y",  Math.PI * 0.5); //px
setPlane("x", -Math.PI * 0.5); //nx
setPlane("x",  Math.PI * 0.5); //ny
setPlane("y",  -Math.PI * 0.5); //pz
setPlane("y",  Math.PI);// nz

function animate() {
  requestAnimationFrame( animate );
  group.rotation.x += 0.01;
  group.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();