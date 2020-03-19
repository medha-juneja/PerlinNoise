var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.z = 5;

var light = new THREE.AmbientLight( 0x1743a3 ); // navy color light
scene.add( light );

light2 = new THREE.PointLight( 0xffcc77, 1.0);
scene.add(light2);
light2.position.z = 3;
light2.position.x = 4;
light2.position.y = 2;

var plane_geometry = new THREE.PlaneGeometry(5,5,99,99);
var plane = new THREE.SceneUtils.createMultiMaterialObject( 
                plane_geometry, [new THREE.MeshPhongMaterial({color: 0x3f7b9d, specular: 0xedf2fa, flatShading: 1, shininess: 2})
        ]);

scene.add(plane);

function octave(noise, nx,ny,numOctaves, planewidth, planeheight){
    let val = 0;
    let freq = 0;
    let max = 0;
    let amp = 0.5;
    for(let i=0; i < numOctaves; i++) {
        val += noise.perlin2((nx+freq)/planewidth,ny/planeheight)*amp;
        max += amp;
        amp /= 2;
        freq  += 200;
        planewidth /= 2;
        planeheight /=2;
    }
    return val/max;
}

noise.seed(Math.random());
for(var i=0;i<100;i++) {
  for(var j=0;j<100;j++) {
    plane_geometry.vertices[i+j*100].z = octave(noise, i, j, 5, 100,100)
  }
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();