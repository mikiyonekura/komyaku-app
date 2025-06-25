"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function MyModel() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/komyaku_ver1.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // 1つ目のアニメーションを再生（他にもあれば切り替え可能）
    if (actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]]?.play();
    }
  }, [actions]);

  return <primitive ref={group} object={scene} />;
}

export default function Home() {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 30], fov: 50 }}>
        <ambientLight />
        <MyModel />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
