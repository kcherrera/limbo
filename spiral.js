import * as THREE from "three";

import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';


// timer
const timer = new THREE.Timer();
// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = -35;
camera.position.z = 0;
camera.lookAt(scene.position);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setAnimationLoop(render);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);

// loading HDR environment map
new HDRLoader()
    .setPath('assets/')
    .load('qwantani_dusk_2_puresky_4k.hdr', function (texture) {

        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.background = texture;
        scene.environment = texture;

        render();
    });

// shapes array
const shapes = [];

// animation
const animate = function () {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    camera.position.setZ(camera.position.z + 1);

    // rotating each frame
    shapes.forEach(shape => {
        shape.rotateX(0.01);
        //     shape.position.setZ(shape.position.z - 1)
    })
}

// animation start
animate();

// creating shapes
const createShape = function (x, y) {
    const geometries = [
        // new THREE.TorusGeometry(5, 3, 16, 100),
        new THREE.SphereGeometry(38, 42, 42),
        // new THREE.CircleGeometry( 5, 32 )
    ]

    // random geometry when you have more than one
    const randNumber = Math.floor(Math.random() * geometries.length);
    const geometry = geometries[randNumber];


    const material = new THREE.MeshPhysicalMaterial({
        color: "rgba(216, 232, 255, 1)",
        roughness: 0.7,
        transmission: 1,
        thickness: 0.5,
    });

    const shape = new THREE.Mesh(geometry, material);

    shape.position.set(
         x - (window.innerWidth / 2),
        (window.innerHeight / 2) - y,
        camera.position.z - 305
    )
    shape.rotateX(0.5);
    shape.rotateZ(0.5);

    // incrementing shapes array
    shapes.push(shape);
    scene.add(shape);

};

// mouse events
let isMouseDown = false;

document.addEventListener("mousemove", function (event) {
    if (isMouseDown) {
        createShape(event.pageX, event.pageY);
    }
})

document.addEventListener("mousedown", function () {
    isMouseDown = true;
})

document.addEventListener("mouseup", function () {
    isMouseDown = false;
})

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

function render() {
    timer.update();
    // controls.update();
    renderer.render(scene, camera);
}