import React, { Suspense, useRef, useState } from "react";
//R3F
import { Canvas, useFrame, useThree } from "react-three-fiber";
// Deai - R3F
import { softShadows, useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { CubeTextureLoader, Scene } from "three";

function Kitty( props ) {

    const group = useRef();
  
    useFrame(() => {
      group.current.rotation.x = -Math.atan(( window.innerWidth/2 - props.mouseY ) / ( window.innerHeight/2 ));
      group.current.rotation.y = -Math.atan(( window.innerWidth/2 - props.mouseX ) / ( window.innerWidth/2 ));
    })
    const { nodes, materials } = useGLTF('/3d/KittyA.gltf')
  
    return (
        <group ref={group} {...props} dispose={null}>
        <group position={[0, 0, 0]}>
            <mesh material={materials.blinn1} geometry={nodes.KittyA_MSHPIV.geometry} position={[0, 0, 0]} />
        </group>
        </group>
    )
}

export default Kitty;