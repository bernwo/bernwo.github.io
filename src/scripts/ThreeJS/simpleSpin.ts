import * as THREE from "three"; // pnpm install three & pnpm install --save-dev @types/three
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OutlineEffect } from "three/examples/jsm/effects/OutlineEffect.js";
import { SpinGeometry } from "@/scripts/ThreeJS/spinGeometry";
let camera: THREE.OrthographicCamera,
  scene: THREE.Scene,
  renderer,
  effect: OutlineEffect;
let particleLight: THREE.Mesh;
let spinMesh: THREE.Mesh;

// Export initialization function that can be called from the component
export function initThreeJsSpin(
  canvasId: string,
  outlineColourString: string,
  pointLightIntensity: number,
): void {
  init(canvasId, outlineColourString, pointLightIntensity);
  animate();
}

function init(
  canvasId: string,
  outlineColourString: string,
  pointLightIntensity: number,
): void {
  // Get canvas element
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) {
    console.error(`Canvas with ID ${canvasId} not found`);
    return;
  }
  camera = new THREE.OrthographicCamera(
    250 / -2,
    250 / 2,
    250 / 2,
    250 / -2,
    1,
    2500,
  );
  camera.position.set(0.0, 400, 700);
  camera.zoom = 0.8;
  camera.updateProjectionMatrix();
  //

  scene = new THREE.Scene();

  //

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(255, 255);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // renderer.outputEncoding = THREE.sRGBEncoding; If you're using older versions of Three.js, you might need this line instead

  // Materials
  const cubeWidth = 250;
  const numberOfSphersPerSide = 2;
  const sphereRadius = (cubeWidth / numberOfSphersPerSide) * 0.8 * 0.5;

  const spinGeometry = SpinGeometry(
    sphereRadius,
    sphereRadius / 5,
    sphereRadius * 3.6,
    sphereRadius / 1.8,
    sphereRadius * 1.15,
  );

  //

  const colorsLength = 3;
  const data = new Uint8Array(colorsLength * 4);
  for (let c = 0; c < colorsLength; c++) {
    const stride = c * 4;
    const value = Math.floor(((c + 1) / colorsLength) * 255);

    // Set R, G, B to same value for grayscale gradient
    data[stride] = value; // R
    data[stride + 1] = value; // G
    data[stride + 2] = value; // B
    data[stride + 3] = 255; // A (fully opaque)
  }
  const gradientMap = new THREE.DataTexture(
    data,
    colorsLength,
    1,
    THREE.RGBAFormat,
    THREE.UnsignedByteType,
  );
  gradientMap.needsUpdate = true;
  gradientMap.colorSpace = THREE.SRGBColorSpace;

  const diffuseColor = new THREE.Color(0xb20600);
  const material = new THREE.MeshToonMaterial({
    color: diffuseColor,
    gradientMap: gradientMap,
    transparent: false,
    opacity: 1,
  });
  spinMesh = new THREE.Mesh(spinGeometry, material);

  spinMesh.position.x = 0;
  spinMesh.position.y = 0;
  spinMesh.position.z = 0;
  scene.add(spinMesh);

  // // Add ambient light to ensure base visibility
  // const ambientLight = new THREE.AmbientLight(0x404040, 100.5);
  // scene.add(ambientLight);

  // Add particle light
  particleLight = new THREE.Mesh();
  scene.add(particleLight);

  // Add point light
  const pointLight = new THREE.PointLight(
    0xffffff,
    pointLightIntensity,
    4000,
    1,
  );
  particleLight.add(pointLight);

  // Add outline effect
  const outlineColour = new THREE.Color(outlineColourString);
  effect = new OutlineEffect(renderer, {
    defaultThickness: 0.02,
    defaultColor: [outlineColour.r, outlineColour.g, outlineColour.b] as [
      number,
      number,
      number,
    ],
  });

  // Add orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 200;
  controls.maxDistance = 2000;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  const timer = Date.now() * 0.00025;

  // Move particle light
  particleLight.position.x = Math.sin(timer * 7) * 150;
  particleLight.position.z = Math.cos(timer * 7) * 150;
  particleLight.position.y = 100;

  // Rotate spin mesh
  spinMesh.rotateY(timer * 5e-11);

  // Render with outline effect
  effect.render(scene, camera);
}
