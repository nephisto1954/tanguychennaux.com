import React, {useRef, Suspense, useEffect} from 'react';
import { Canvas, useFrame, meshStandardMaterial} from '@react-three/fiber';
import * as THREE from 'three';
import Auber_SemiBold_Regular from './assets/fonts/Auber_SemiBold_Regular';
import JetBrains_Mono_Regular from './assets/fonts/JetBrains_Mono_Regular';
import { ResizeObserver } from '@juggle/resize-observer';
import { Sky, OrthographicCamera, MeshDistortMaterial, Html, useProgress, Environment} from "@react-three/drei";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

import { useBlock } from "./components/block"
import state from "./store"
import './App.css'
import LowPoly from './assets/models/Low-poly-landscape'
import HdrFile from './assets/hdri/venice_sunset_1k.hdr'


/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

function TitleTextMesh(props) {
  const mesh = useRef(null)
  const {mobile} = useBlock()

  const clock = new THREE.Clock();

  useFrame(() => {
    const a = clock.getElapsedTime()
    mesh.current.scale.set(15,15,a*0.5)
    mesh.current.geometry.center()



    if ((mesh.current.scale.z <0.85 )) {
      mesh.current.position.z += (Math.sin(a * 2) -  Math.cos(a * 2)) * 0.05
      mesh.current.rotation.x += (Math.sin(a * 2) +  Math.cos(a * 2))
      mesh.current.rotation.y += (Math.sin(a * 2) -  Math.cos(a * 2))
      mesh.current.rotation.z += (Math.sin(a * 2) /  Math.cos(a * 2))
    } else {

      mesh.current.rotation.set(0,0,0)
      if (mobile){
        mesh.current.position.set(0, 250, 200)
        mesh.current.scale.set(0.5,0.5,0.5)
      } else {
        mesh.current.position.set(0, 280, 100)
        mesh.current.scale.set(1.5,1.5,1.5)
      }
    }
  })


  // parse JSON file with Three
  const font = new THREE.FontLoader().parse(Auber_SemiBold_Regular);

  const text = `Tanguy Chennaux`

  // configure font geometry
  const textOptions = {
    font,
    size: 30,
    height: 8,
    color:"#048091"
  };

  // mesh position={[10, 0, -100]} 

  return (
    <mesh position={[0, 0, 0]} ref={mesh} castShadow
    receiveShadow>
      <textGeometry attach='geometry' args={[text, textOptions]} />
      <meshStandardMaterial
          attach="material"
          color="#88ABC2"
          factor={0.01} // Strength, 0 disables the effect (default=1)
          speed={0.02} // Speed (default=1)
          roughness={1}
        />
    </mesh>
  )
}

function DescriptionTextMesh(props) {
  const mesh = useRef(null)
  const {mobile} = useBlock()

  // const clock = new THREE.Clock();

  useFrame(() => {
    mesh.current.rotation.set(0,0,0)
    
    if (mobile){
      mesh.current.scale.set(0.5,0.5,0.5)
      mesh.current.position.set(-80, 220, 200)
    } else {
      mesh.current.position.set(-150, 200, 200)
      mesh.current.scale.set(0.5,0.5,0.5)
    }

  })


  // parse JSON file with Three
  const font = new THREE.FontLoader().parse(JetBrains_Mono_Regular);

  const text = `
    I am a Front-End Developer
    looking for my next role, 
    preferably involving 3D 
    technologies (three and Blender).
  `

  // configure font geometry
  const textOptions = {
    font,
    size: 10,
    height: 1
  };

  // mesh position={[0, -50, -100]} 

  return (
    <mesh position={[0, 0, 0]} ref={mesh} castShadow
    receiveShadow>
      <textGeometry attach='geometry' args={[text, textOptions]} />
      <MeshDistortMaterial
          color="black"
          attach="material"
          distort={0.005} // Strength, 0 disables the effect (default=1)
          speed={2} // Speed (default=1)
          roughness={0}
        />
    </mesh>
  )
}

function Scene(){

  const mesh = useRef(null)

  const { mobile } = useBlock()

  // const clock = new THREE.Clock();

  useFrame(() => {

    if (mobile){
      mesh.current.scale.set(100,100,100)
    } 

    // mesh.current.geometry.center()
    mesh.current.scale.set(1000, 1000, 1000)
    mesh.current.rotation.set(0,Math.PI,0)
    mesh.current.position.set(0, 0, -500)
  })


  return (
    <mesh position={[0, 0, 0]} ref={mesh} castShadow
    receiveShadow>
        {/* {notMobile && <OrbitControls/>} */}
        <LowPoly />
    </mesh>
  )
}

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}




export default function App() {

  const scrollArea = useRef()
  const onScroll = e => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])


  return (
    <>
      <Canvas mode="concurrent" shadow={true} resize={{ polyfill: ResizeObserver }}>  
        <Sky
          distance={20000} // Camera distance (default=450000)
          sunPosition={[0, 1, 0]} // Sun position normal (defaults to inclination and azimuth if not set)
          inclination={0.2} // Sun elevation angle from 0 to 1 (default=0)
          azimuth={0.25} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
          rayleigh={0.5}
        />
        <Suspense fallback={<Loader />}>
                {/*An ambient light that creates a soft light against the object */}
          <ambientLight intensity={0.25} />
          {/*An directional light which aims form the given position */}
          <directionalLight position={[100, 100, -250]} intensity={1} />
          {/*An point light, basically the same as directional. This one points from under */}
          <pointLight position={[10, 200, -250]} intensity={0.5} />
          <OrthographicCamera position={[0,-150,-400]} fov={10} aspect={sizes.width/sizes.height} near={0.01} far={5000}>
            <Scene position={[10, 0, -450]}/>
            <TitleTextMesh />
            <DescriptionTextMesh />
            <Environment preset={"sunset"}/>
          </OrthographicCamera>
        </Suspense>
      </Canvas>
      <div ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
}
