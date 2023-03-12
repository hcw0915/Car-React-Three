import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

const Box = ({ color }) => {
  const boxRef = useRef();
  const time = useRef(0);
  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());

  const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);

  const getInitialPosition = () => {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      (Math.random() * 2 - 1) * 15
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;
    // 他說不能這樣用?  晚點再來理解
    // setPosition(v);
    return v;
  };

  // const resetPosition = () => {
  //   let v = new Vector3(
  //     (Math.random() * 2 - 1) * 3,
  //     Math.random() * 2.5 + 0.1,
  //     Math.random() * 10 + 10
  //   );
  //   if (v.x < 0) v.x -= 1.75;
  //   if (v.x > 0) v.x += 1.75;

  //   setPosition(v);
  // };

  const [position, setPosition] = useState(getInitialPosition());

  useFrame(
    (state, delta) => {
      // time.current += delta * 1.5;
      // let newZ = position.z - time.current;

      // if (newZ < -10) {
      //   resetPosition();
      //   time.current = 0;
      // }

      boxRef.current.position.set(position.x * 1.1, position.y, position.z);
      boxRef.current.rotation.x += delta * xRotSpeed;
      boxRef.current.rotation.y += delta * yRotSpeed;
    },
    [xRotSpeed, yRotSpeed, position]
  );

  return (
    <mesh ref={boxRef} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} envMapIntensity={0.15} />
    </mesh>
  );
};

export const Boxes = () => {
  const [arr] = useState(() => {
    let a = [];
    for (let i = 0; i < 100; i++) {
      a.push(0);
    }
    return a;
  });

  return (
    <>
      {arr.map((value, index) => (
        <Box
          // 用map 賦予 key值
          key={index}
          color={index % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]}
        />
      ))}
    </>
  );
};
