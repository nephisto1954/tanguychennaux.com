import React, {useRef, Suspense, useEffect} from 'react';
import { Canvas, useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import Bearpaw_Regular from './assets/fonts/Bearpaw_Regular';
import JetBrains_Mono_Regular from './assets/fonts/JetBrains_Mono_Regular';
import { ResizeObserver } from '@juggle/resize-observer';
import { Sky, OrthographicCamera, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Html, useProgress, OrbitControls} from "@react-three/drei";

import { Block, useBlock } from "./components/block"
import state from "./store"
import './App.css'
import LowPoly from './assets/models/Low-poly-landscape'

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
        mesh.current.position.set(15, 150, -100)
        mesh.current.scale.set(0.2,0.2,0.2)
      } else {
        mesh.current.position.set(15, 120, -100)
        mesh.current.scale.set(0.9,0.9,0.9)
      }
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
  const {mobile} = useBlock()

  // const clock = new THREE.Clock();

  useFrame(() => {
    mesh.current.rotation.set(0,0,0)
    
    if (mobile){
      mesh.current.scale.set(0.07,0.07,0.2)
      mesh.current.position.set(-10, 112, 0)
    } else {
      mesh.current.position.set(-100, 80, -20)
      mesh.current.scale.set(0.2,0.2,0.2)
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


function Plane({ color = "white", ...props }) {
  return (
    <mesh {...props}>
      <planeGeometry />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}


function Content({ left, children }) {
  const { contentMaxWidth, canvasWidth, margin, mobile } = useBlock()
  const aspect = 1.75
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2

  return (
    <group position={[alignRight * (left ? -1 : 1), 0, 0]}>
      <Plane scale={[contentMaxWidth, contentMaxWidth / aspect, 1]} color="#bfe2ca" />
      {children}
    </group>
  )
}

function Scene(){

  const mesh = useRef(null)

  const { contentMaxWidth, canvasWidth, margin, mobile } = useBlock()
  const pixelWidth = contentMaxWidth * state.zoom
  const aspect = 1.75
  const notMobile = !mobile

  // const clock = new THREE.Clock();

  useFrame(() => {

    if (mobile){
      mesh.current.scale.set(100,100,100)
    } 

    // mesh.current.geometry.center()
    mesh.current.scale.set(1000, 1000, 1000)
    mesh.current.rotation.set(0,0,0)
    mesh.current.position.set(0, 0, -500)
  })


  return (
    <mesh position={[0, 0, 0]} ref={mesh} castShadow
    receiveShadow>
        {notMobile && <OrbitControls/>}
        <Block factor={1.5} offset={0}>
          <Content left style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: "left" }} position={[-contentMaxWidth / 2, -contentMaxWidth / 2 / aspect - 0.4, 1]}>
            <Html >
              The substance can take you to heaven but it can also take you to hell.
            </Html>
          </Content>
        </Block>
        {/* Second section */}
        <Block factor={2.0} offset={1}>
          <Content left>
            <Html style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: "left" }} position={[-contentMaxWidth / 2, -contentMaxWidth / 2 / aspect - 0.4, 1]}>
              The substance can take you to heaven but it can also take you to hell.
            </Html>
          </Content>
        </Block>
        <LowPoly />
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
      <mesh position={[-3, 400, -500]} ref={mesh}>
          {items}
      </mesh>
)}

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
          distance={450000} // Camera distance (default=450000)
          sunPosition={[0, 1, 0]} // Sun position normal (defaults to inclination and azimuth if not set)
          inclination={0.2} // Sun elevation angle from 0 to 1 (default=0)
          azimuth={0.25} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
        />
        <Suspense fallback={<Loader />}>
                {/*An ambient light that creates a soft light against the object */}
          <ambientLight intensity={0.25} />
          {/*An directional light which aims form the given position */}
          <directionalLight position={[100, 100, 50]} intensity={1} />
          {/*An point light, basically the same as directional. This one points from under */}
          <pointLight position={[10, -100, 25]} intensity={0.5} />
          <OrthographicCamera position={[0,-100,-50]} fov={10} aspect={sizes.width/sizes.height} near={1} far={200}>
            <TitleTextMesh />
            <DescriptionTextMesh />
            <Scene />
            <Virus />
          </OrthographicCamera>
        </Suspense>
      </Canvas>
      <div ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
}
