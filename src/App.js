import React, { Suspense, useRef, useState } from "react";
//R3F
import { Canvas, useFrame } from "react-three-fiber";
// Deai - R3F
import { softShadows, useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { CubeTextureLoader } from "three";
import * as THREE from "three";
// Styles
import "./App.css";
// React Spring
// import { useSpring, a } from "react-spring/three";

// soft Shadows
softShadows();

function KittyA(props) {

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

// function SkyBox() {
//   const { scene } = useThree();
//   const loader = new CubeTextureLoader();

//   scene.background = texture;
//   const texture = loader.load([
//     "/3d/80sbg.jpg",
//     "/3d/80sbg.jpg",
//     "/3d/80sbg.jpg",
//     "/3d/80sbg.jpg",
//     "/3d/80sbg.jpg",
//     "/3d/80sbg.jpg"
//   ])
// }
// const SpinningMesh = ({ position, color, speed, args }) => {
//   //ref to target the mesh
//   const mesh = useRef();

//   //useFrame allows us to re-render/update rotation on each frame
//   useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

//   //Basic expand state
//   const [expand, setExpand] = useState(false);
//   // React spring expand animation
//   const props = useSpring({
//     scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
//   });
//   return (
//     <a.mesh
//       position={position}
//       ref={mesh}
//       onClick={() => setExpand(!expand)}
//       scale={props.scale}
//       castShadow>
//       <boxBufferGeometry attach='geometry' args={args} />
//       <MeshWobbleMaterial
//         color={color}
//         speed={speed}
//         attach='material'
//         factor={0.6}
//       />
//     </a.mesh>

//     //Using Drei box if you want
//     // <Box {...props} ref={mesh} castShadow>
//     //   <MeshWobbleMaterial
//     //     {...props}
//     //     attach='material'
//     //     factor={0.6}
//     //     Speed={1}
//     //   />
//     // </Box>
//   );
// };

const App = () => {
  const [ mouseX, setMouseX ] = useState(0);
  const [ mouseY, setMouseY ] = useState(0);

  return (
    <>
      <p>X: { mouseX }, Y: { mouseY }, Window width: { window.innerWidth }</p>
      <Canvas
        onMouseMove={ ( e ) => { 
          setMouseX( e.clientX );
          setMouseY( e.clientY );
        }}
        colorManagement
        shadowMap
        camera={{ position: [0, 0, 11], fov: 70 }}>
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        {/* <group>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
            receiveShadow>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={0.3} />
          </mesh>
          <SpinningMesh
            position={[0, 1, 0]}
            color='lightblue'
            args={[3, 2, 1]}
            speed={2}
          />
          <SpinningMesh position={[-2, 1, -5]} color='pink' speed={6} />
          <SpinningMesh position={[5, 1, -2]} color='pink' speed={6} />
        </group> */}
        {/* <OrbitControls/> */}
        <Suspense fallback={ null } >
          <KittyA mouseX={ mouseX } mouseY={ mouseY } position={[0, -2, 0]}/>
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;