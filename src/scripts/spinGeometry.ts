import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";

// Reference: https://stackoverflow.com/questions/30245990/how-to-merge-two-geometries-or-meshes-using-three-js-r71
export function SpinGeometry(
	sphereRadius: number,
	cylinderRadius: number,
	cylinderHeight: number,
	coneRadius: number,
	coneHeight: number
): THREE.BufferGeometry {
	//   const { mergeGeometries } = await import(
	// "three/examples/jsm/utils/BufferGeometryUtils.js"
	//   );
	const radialSegments: number = 32;
	const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 16);
	const cylinderGeometry: THREE.CylinderGeometry = new THREE.CylinderGeometry(
		cylinderRadius,
		cylinderRadius,
		cylinderHeight,
		radialSegments
	);
	const coneGeometry: THREE.ConeGeometry = new THREE.ConeGeometry(
		coneRadius,
		coneHeight,
		radialSegments
	);
	// cylinderGeometry.translate(0, 100, 0);
	cylinderGeometry.rotateZ(-3.14 / 8);
	coneGeometry.translate(0, cylinderHeight / 2 + coneHeight / 2, 0);
	coneGeometry.rotateZ(-3.14 / 8);

	const spinGeometry = BufferGeometryUtils.mergeBufferGeometries([
		cylinderGeometry,
		sphereGeometry,
		coneGeometry,
	]);

	return spinGeometry;
}
