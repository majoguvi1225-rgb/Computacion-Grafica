import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFB5C0);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );

let torus;

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00, roughness: 0.5, metalness:1 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const materialBasic = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true, opacity: 1 } );
const cube2 = new THREE.Mesh( geometry, materialBasic );
scene.add( cube2 );

const materialLambert = new THREE.MeshLambertMaterial( { color: 0x00ff00, emissive: 0xff0000, emissiveIntensity:0.1 } );
const cube3 = new THREE.Mesh( geometry, materialLambert );
scene.add( cube3 );

const materialNormal = new THREE.MeshLambertMaterial( { color: 0x00ff00, transparent: true, opacity: 1, wireframe: true, wireframeLinewidth:5, wireframeLinejoin: 'round', wireframeLinecap: 'round' } );
const cube4 = new THREE.Mesh( geometry, materialNormal );
scene.add( cube4 );

const TextureLoader = new THREE.TextureLoader();
const texture = new THREE.TextureLoader().load('./assets/images/ajedrez.png');
const materialTxt = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide})
const cube5 = new THREE.Mesh(geometry, materialTxt);
scene.add(cube5);

const materialCube= [
  new THREE.MeshBasicMaterial({ map: TextureLoader.load('./assets/images/face1.jpg'),side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({ map: TextureLoader.load('./assets/images/face2.png'),side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({ map: TextureLoader.load('./assets/images/face3.jpg'),side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({ map: TextureLoader.load('./assets/images/face4.jpg'),side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({ map: TextureLoader.load('./assets/images/face5.png'),side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({ map: TextureLoader.load('./assets/images/face6.jpg'),side: THREE.DoubleSide}),
];
const cube6 = new THREE.Mesh(geometry, materialCube);
scene.add(cube6);

camera.position.set(0, 3.5, 8);
camera.lookAt(0,0,0);
controls.update();

function animate() {
  cube.rotation.x += 0.01;  cube.rotation.y += 0.01;
  cube2.rotation.x += 0.01; cube2.rotation.y += 0.01;
  cube3.rotation.x += 0.01; cube3.rotation.y += 0.01;
  cube4.rotation.x += 0.01; cube4.rotation.y += 0.01;
  cube5.rotation.x += 0.01; cube5.rotation.y += 0.01;
  cube6.rotation.x += 0.01; cube6.rotation.y += 0.01;

  if (torus){ torus.rotation.x += 0.005; torus.rotation.y += 0.01; }

  controls.update();
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

const light = new THREE.AmbientLight( 0x404040 );
scene.add( light );
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
directionalLight.position.set(2,5,2);
scene.add( directionalLight );
const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
pointLight.position.set( 6, 6, 6 );
scene.add( pointLight );
const pointLightHelper = new THREE.PointLightHelper( pointLight, 1 );
scene.add( pointLightHelper );

// Objeto distinto (TorusKnot) con la textura de gotas
const torusTex = new THREE.TextureLoader().load('./assets/images/gotas.png');
torusTex.colorSpace = THREE.SRGBColorSpace;
const torusMat = new THREE.MeshStandardMaterial({ map: torusTex, transparent: true, opacity: 0.85, metalness: 0.2, roughness: 0.8 });
torus = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.25, 220, 24), torusMat);
torus.position.set(0, 0.8, 3);
scene.add(torus);

// Organización de cubos en grilla
const cubos = [cube, cube2, cube3, cube4, cube5, cube6];
const cols = 3, sep = 2.2, baseY = 0.5, startX = -((cols-1)*sep)/2, startZ = -2;
cubos.forEach((m,i)=>{
  const r = Math.floor(i/cols);
  const c = i%cols;
  m.position.set(startX + c*sep, baseY, startZ + r*sep);
});

// Piso real (pasto/ladrillo)
const sueloTex = new THREE.TextureLoader().load('./assets/images/piso.jpg'); // cambia a ladrillo.jpg si prefieres
sueloTex.wrapS = sueloTex.wrapT = THREE.RepeatWrapping;
sueloTex.repeat.set(20, 20);
sueloTex.colorSpace = THREE.SRGBColorSpace;
const sueloMat = new THREE.MeshStandardMaterial({
  map: sueloTex,
  roughness: 1.0,
  metalness: 0.0,
  side: THREE.DoubleSide,
  polygonOffset: true,
  polygonOffsetFactor: -1
});
const sueloGeo = new THREE.PlaneGeometry(120, 120);
const suelo = new THREE.Mesh(sueloGeo, sueloMat);
suelo.rotation.x = -Math.PI / 2;
suelo.position.y = -1.18;
scene.add(suelo);

//objeto imagen water
const aguaTex = new THREE.TextureLoader().load('./assets/images/water.png');
aguaTex.wrapS = aguaTex.wrapT = THREE.RepeatWrapping;
aguaTex.repeat.set(8, 8);
aguaTex.colorSpace = THREE.SRGBColorSpace;
const waterSkyMat = new THREE.MeshBasicMaterial({ map: aguaTex, side: THREE.BackSide, transparent: true, opacity: 0.6 });
const waterSkyGeo = new THREE.BoxGeometry(1000, 1000, 1000);
const waterSky = new THREE.Mesh(waterSkyGeo, waterSkyMat);
scene.add(waterSky);

