import { DirectionalLight, WebGLRenderer, PerspectiveCamera, Scene, BoxGeometry, MeshPhongMaterial, Mesh } from 'three';

function main() {
  const canvas = document.querySelector('#c') as Element;
  const renderer = new WebGLRenderer({ canvas });

  const cameraConfig = {
    fieldOfView: 75,
    // 300x150 canvas, 300/150 = 2. Aspect Ratio 2
    aspect: 2,
    near: 0.1,
    far: 5,
  };

  const camera = new PerspectiveCamera(
    cameraConfig.fieldOfView,
    cameraConfig.aspect,
    cameraConfig.near,
    cameraConfig.far
  );

  camera.position.z = 2;

  const scene = new Scene();
  const cube = makeCube(1, 1, 1);
  const light = makeLight();

  scene.add(cube);
  scene.add(light);
  requestAnimationFrame((time) => renderWithAnimation(time, scene, camera, cube, renderer));
}

function makeLight(): DirectionalLight {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new DirectionalLight(color, intensity);

  light.position.set(-1, 2, 4);

  return light;
}

function makeCube(width: number, height: number, depth: number): Mesh {
  const geometry = new BoxGeometry(width, height, depth);
  const material = new MeshPhongMaterial({ color: 0x44aa88 });
  const cube = new Mesh(geometry, material);

  return cube;
}

function renderWithAnimation(time: number, scene: Scene, camera: PerspectiveCamera, cube: Mesh, renderer: WebGLRenderer): void {
  time *= 0.001;

  cube.rotation.x = time;
  cube.rotation.y = time;

  renderer.render(scene, camera);
  requestAnimationFrame((time) => renderWithAnimation(time, scene, camera, cube, renderer));
}

main();
