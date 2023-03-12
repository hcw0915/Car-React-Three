import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  CubeCamera,
  Environment,
  Html,
  Loader,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import './styles.css'
import { Ground } from './Ground'
import { Rings } from './Rings'
import { CarModel } from './Car2'
import { Boxes } from './Boxes'
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { FloatingGrid } from './FloatingGrid'

const CarShow = () => {
  return (
    <>
      {/* <Html>qweqeq</Html> */}
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      {/* let color = new Color(0, 0, 0) 設定背景顏色dd */}
      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={512} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <CarModel scale={[0.006, 0.006, 0.006]} />
            {/* <Car /> */}
          </>
        )}
      </CubeCamera>

      {/* <CarModel scale={[0.006, 0.006, 0.006]} /> */}
      <Rings />
      <Boxes />
      <FloatingGrid />
      {/* 
        let spotlight = new Spotlight()
        spotlight.intensity = 1.5;
        spotlight.position.set(...)  
      */}
      <ambientLight intensity={0.1} />
      <pointLight intensity={1} args={[3, 3, 3]} />
      <spotLight
        //! 這是甚麼表示法??
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadowBias={-0.0001}
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadowBias={-0.0001}
      />

      <Ground />

      <EffectComposer>
        {/* 景深效果 */}
        <DepthOfField
          focusDistance={0.0035}
          focalLength={0.01}
          bokehScale={3}
          height={480}
        />
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3} // The bloom intensity
          width={300} // render width
          height={300} // render height
          kernelSize={3} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>
      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={'red'} />
      </mesh> */}
    </>
  )
}

const App = () => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '40vw',
          backgroundColor: '#585757',
          borderRadius: '10px',
          zIndex: '200',
          width: '400px',
          height: '50px',
          padding: '5px 10px',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
          fontFamily: 'consolas',
        }}
      >
        Press mouse to move the camera.
      </div>
      <Suspense fallback={<Loader />}>
        <Canvas shadows>
          <CarShow></CarShow>
        </Canvas>
      </Suspense>
    </>
  )
}

export default App
