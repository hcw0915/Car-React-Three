import { useFrame, useLoader } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { RepeatWrapping, TextureLoader } from 'three';
import GridTexture from './assets/textures/grid-texture.png';

export const FloatingGrid = () => {
  const diffuse = useLoader(TextureLoader, GridTexture);

  useEffect(() => {
    diffuse.wrapS = RepeatWrapping;
    diffuse.wrapT = RepeatWrapping;
    diffuse.anisotropy = 4;
    diffuse.repeat.set(30, 30);
    diffuse.offset.set(0, 0);
  }, [diffuse]);

  // 地板動畫依照每一幀做位移 => 要確認 offset實際內容，應該不是單純移動
  useFrame((state, delta) => {
    let t = -state.clock.getElapsedTime() * 0.68;
    diffuse.offset.set(0, t);
  });

  return (
    <>
      <mesh rotation-x={-Math.PI * 0.5} position={[0, 0.425, 0]}>
        <planeGeometry args={[35, 35]} />
        <meshBasicMaterial
          color={[1, 1, 1]}
          map={diffuse}
          alphaMap={diffuse}
          transparent={true}
          opacity={0.15}
        />
      </mesh>
    </>
  );
};
