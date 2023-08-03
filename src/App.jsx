import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage, Loader } from '@react-three/drei'
import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from "valtio"
import * as THREE from 'three'

/*
Motorbike R3f function auto-generated by: https://github.com/pmndrs/gltfjsx, then adapted manually
*/

const state = proxy({
  current: 'main',
  items: {
    main: "#b03523",
    secondary: "#313032",
    rim: "#d0cfd4",
  },
})

function Motorbike(props) {
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF("./Motorcycle-Seperated.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LightScreen.geometry}
        material={materials.Mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tires.geometry}
        material={materials.Mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Aluminium.geometry}
        material={materials.Mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rims.geometry}
        material={new THREE.MeshStandardMaterial({ color: new THREE.Color(snap.items.rim), transparent: true })}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainBody.geometry}
        material={new THREE.MeshStandardMaterial({ color: new THREE.Color(snap.items.main), transparent: true })}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SecondaryBody.geometry}
        material={new THREE.MeshStandardMaterial({ color: new THREE.Color(snap.items.secondary), transparent: true })}
      />
    </group>
  );
}

// Set state of what color to change.
function Picker() {
  const snap = useSnapshot(state)
  return (
    <div className="picker">
      <h1>Pick colour: {snap.current}</h1>
      <div className="button-container">
        <button onClick={() => { state.current = 'main' }}>Main</button>
        <button onClick={() => { state.current = 'secondary' }}>Secondary</button>
        <button onClick={() => { state.current = 'rim' }}>Rim</button>
      </div>
      <HexColorPicker className="custom-layout" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
    </div>
  )
}

function App() {
  return (
    <>
      <Canvas shadows
        flat
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 0, 3]
        }}
      >
        <Stage
          preset="rembrandt"
          intensity={4}
          shadows="contact"
          adjustCamera={1.5}
          environment="city">
          <Motorbike scale={0.02} />
        </Stage>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} autoRotate autoRotateSpeed={0.3} enableZoom={false} enablePan={false} />
      </Canvas>
      <a href="https://github.com/hughdtt" className="github" target="_blank">Github</a><br />
      <a href="https://poly.pizza/m/dse64pqMKAR" target="_blank">Motorcycle by Poly by Google [CC-BY] via Poly Pizza</a>
      <Picker />
    </>
  )
}

export default App
