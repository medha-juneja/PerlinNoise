var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.z = 5;

var plane_geometry = new THREE.PlaneGeometry(5,5,99,99);
var plane = new THREE.SceneUtils.createMultiMaterialObject( 
                plane_geometry, [new THREE.MeshBasicMaterial({color: 0x666666})
        ]);

scene.add(plane);

noise.seed(Math.random());
for(var i=0;i<100;i++) {
  for(var j=0;j<100;j++) {
    var ex = 0.5;
    plane_geometry.vertices[i+j*100].z = (noise.perlin2(i/100,j/100)+(noise.perlin2((i+200)/50,j/50)*Math.pow(ex,1))+(noise.perlin2((i+400)/25,j/25)*Math.pow(ex,2))+
      (noise.perlin2((i+600)/12.5,j/12.5)*Math.pow(ex,3))+
+
      (noise.perlin2((i+800)/6.25,j/6.25)*Math.pow(ex,4))                                 
                                )/2;
  }
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();