import React, {useRef, Suspense} from 'react';
import { Canvas, useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import Bearpaw_Regular from './assets/fonts/Bearpaw_Regular';
import JetBrains_Mono_Regular from './assets/fonts/JetBrains_Mono_Regular';
import useMeasure from 'react-use-measure'
import { ResizeObserver } from '@juggle/resize-observer'

import './App.css'

import { Sky, OrthographicCamera, MeshDistortMaterial, MeshWobbleMaterial, Sphere, OrbitControls} from "@react-three/drei";

import LowPoly from './Low-poly-landscape'

/**
 * Sizes
 */
 const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


function TitleTextMesh(props) {
  const mesh = useRef(null)

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
      mesh.current.position.set(15, 120, -100)
      mesh.current.rotation.set(0,0,0)
      mesh.current.scale.set(0.9,0.9,0.9)
    }
  })


  // parse JSON file with Three
  const font = new THREE.FontLoader().parse(Bearpaw_Regular);

  const text = `Tanguy Chennaux`

  // configure font geometry
  const textOptions = {
    font,
    size: 50,
    height: 2,
    color:"#00A38D"
  };

  // mesh position={[10, 0, -100]} 

  return (
    <mesh position={[0, 0, 0]} ref={mesh} castShadow
    receiveShadow>
      <textGeometry attach='geometry' args={[text, textOptions]} />
      <MeshWobbleMaterial
          attach="material"
          color="#00A38D"
          factor={0.01} // Strength, 0 disables the effect (default=1)
          speed={0.02} // Speed (default=1)
          roughness={1}
        />
    </mesh>
  )
}

function DescriptionTextMesh(props) {
  const mesh = useRef(null)

  // const clock = new THREE.Clock();

  useFrame(() => {
    mesh.current.position.set(-100, 80, -20)
    mesh.current.rotation.set(0,0,0)
    mesh.current.scale.set(0.2,0.2,0.2)
  })




  // parse JSON file with Three
  const font = new THREE.FontLoader().parse(JetBrains_Mono_Regular);

  const text = `
    I am a Junior Front-End Developer
    looking for his next role, 
    preferably involving 3D 
    technologies (three and Blender)
  `

  // configure font geometry
  const textOptions = {
    font,
    size: 15,
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

  // const clock = new THREE.Clock();

  useFrame(() => {
    // mesh.current.geometry.center()
    mesh.current.scale.set(1000, 1000, 1000)
    mesh.current.rotation.set(0,0,0)
    mesh.current.position.set(0, 0, -500)
  })


  return (
    <mesh position={[0, 0, 0]} ref={mesh} castShadow
    receiveShadow>
        <LowPoly />
        {/* <Lake /> */}
    </mesh>
  )
}


function Virus() {
  const mesh = useRef(null)

  const clock = new THREE.Clock();

  useFrame(() => {
    const a = clock.getElapsedTime()
    mesh.current.geometry.center()
    mesh.current.rotation.x += (Math.sin(a) *  Math.cos(a)) * 0.0005
    mesh.current.rotation.y += (Math.sin(a) *  Math.cos(a)) * 0.0005
    mesh.current.rotation.z += (Math.sin(a) *  Math.cos(a)) * 0.0005
    mesh.current.position.x += (Math.sin(a) *  Math.cos(a)) * 0.0005
    mesh.current.position.y += (Math.sin(a) *  Math.cos(a)) * 0.0005
    mesh.current.position.z += (Math.sin(a) *  Math.cos(a)) * 0.0005

    // mesh.current.position.set(180, -100, -100)
  })


  const copyArray = new Array(100).fill()
  console.log(copyArray);
  const items=copyArray.map((j, i) => {
    const x = (Math.random(i) * i * Math.sin(i) / Math.cos(i)) * i
    const y = Math.sin(i) + Math.cos(i) * 10
    const z = Math.random(i) * i * Math.sin(i) - Math.cos(i) / 10
    return (
      <Sphere visible key={i} position={[-x, -y, -z]} args={[x/4, y/2, z/1000]}>
        <MeshDistortMaterial
            color="#00A38D"
            attach="material"
            distort={1} // Strength, 0 disables the effect (default=1)
            speed={1} // Speed (default=1)
            roughness={1}
        />
      </Sphere>
      )
    })
  return(
    <>
      <mesh position={[-3, 400, -500]} ref={mesh}>
          {items}
      </mesh>
    </>
)}

export default function App() {
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver })

  return (
    <Canvas shadow={true} id="TanguyChennaux" ref={ref}>  
      <Sky
        distance={450000} // Camera distance (default=450000)
        sunPosition={[0, 1, 0]} // Sun position normal (defaults to inclination and azimuth if not set)
        inclination={0.2} // Sun elevation angle from 0 to 1 (default=0)
        azimuth={0.25} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
      />
      <Suspense fallback={null}>
              {/*An ambient light that creates a soft light against the object */}
        <ambientLight intensity={0.25} />
        {/*An directional light which aims form the given position */}
        <directionalLight position={[100, 100, 50]} intensity={1} />
        {/*An point light, basically the same as directional. This one points from under */}
        <pointLight position={[10, -100, 25]} intensity={0.5} />
        <OrthographicCamera position={[0,-100,-50]} fov={10} aspect={sizes.width/sizes.height} near={1} far={200}>
          <OrbitControls/>
          <TitleTextMesh />
          <DescriptionTextMesh />
          <Scene />
          <Virus />
        </OrthographicCamera>
      </Suspense>
    </Canvas>
  );
}
