import React, { useMemo } from 'react';
import * as THREE from 'three';

const atmosphereVertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const atmosphereFragmentShader = `
varying vec3 vNormal;
varying vec3 vPosition;
uniform vec3 uColor;

void main() {
  // View direction in camera space (camera is at 0,0,0 looking down -Z)
  vec3 viewDir = normalize(-vPosition);
  
  // Fresnel calculation: maximum intensity at grazing edge
  float fresnel = dot(vNormal, viewDir);
  fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
  
  // Smooth power curve for warm architectural glow
  float intensity = pow(fresnel, 2.8) * 0.85;
  
  gl_FragColor = vec4(uColor, intensity);
}
`;

export default function GlobeAtmosphere({ radius = 3.0 }) {
  const uniforms = useMemo(
    () => ({
      // Warm ivory/amber tint matching architectural paper palette
      uColor: { value: new THREE.Color('#F2EAD8') },
    }),
    []
  );

  return (
    <mesh renderOrder={2}>
      <sphereGeometry args={[radius * 1.04, 64, 64]} />
      <shaderMaterial
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        uniforms={uniforms}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
