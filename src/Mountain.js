import React, {useRef, Suspense} from 'react';
import { Canvas, useFrame} from '@react-three/fiber';
import * as THREE from 'three';

import { Sky, OrthographicCamera, Html, useProgress, Environment, OrbitControls} from "@react-three/drei";
import { useSpring, animated } from '@react-spring/web'
import { ResizeObserver } from '@juggle/resize-observer';

import { useBlock } from "./components/block"
import './App.css'

import JetBrains_Mono_Regular from './assets/fonts/JetBrains_Mono_Regular';
import Auber_SemiBold_Regular from './assets/fonts/Auber_SemiBold_Regular';
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

    mesh.current.rotation.set(0,0,0)
    if (mobile){
      mesh.current.position.set(0, 360, 200)
      mesh.current.scale.set(0.5,0.5,0.5)
    } else {
      mesh.current.position.set(0, 340, 200)
      mesh.current.scale.set(1.3,1.3,1.3)
    }   
  })

  const font = new THREE.FontLoader().parse(Auber_SemiBold_Regular);
  const text = `Tanguy Chennaux`

  // configure font geometry
  const textOptions = {
    font,
    size: 30,
    height: 8
  };

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

function IntroTextMesh(props) {
  const mesh = useRef(null)
  const {mobile} = useBlock()

  useFrame(() => {
    mesh.current.rotation.set(0,0,0)
    
    if (mobile){
      mesh.current.scale.set(0.35,0.35,0.35)
      mesh.current.position.set(-90, 320, 200)
    } else {
      mesh.current.position.set(-120, 275, 300)
      mesh.current.scale.set(0.25,0.25,0.25)
    }
  })

  const font = new THREE.FontLoader().parse(JetBrains_Mono_Regular);
  const text = `
    I am a Front-End Developer looking for my next role, 
    preferably involving 3D technologies (three and Blender).

    Whilst working for Mumsnet, I was the lead developer
    for their Alexa Skill. Try Mumsnet Pregnancy Advice.
    It's free, fun and informative.

    The best way to contact me is via my Linkedin profile.
  `

  // configure font geometry
  const textOptions = {
    font,
    size: 10,
    height: 1
  };

  return (
    <mesh position={[0, 0, 0]} ref={mesh} castShadow
    receiveShadow>
      <textGeometry attach='geometry' args={[text, textOptions]} />
      <meshStandardMaterial
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

  useFrame(() => {

    if (mobile){
      mesh.current.scale.set(100,100,100)
    } 
    mesh.current.scale.set(1000, 1000, 1000)
    mesh.current.rotation.set(0,Math.PI+5,0)
    mesh.current.position.set(0, 0, -500)
  })


  return (
    <mesh position={[0, 0, 0]} ref={mesh} castShadow
    receiveShadow>
        {!mobile && <OrbitControls />}
        <LowPoly />
    </mesh>
  )
}

function Loader() {
  const { progress } = useProgress()
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    delay: 10,
    config: {
      duration: 3000
    }
  })

  return (
    <Html center><animated.h1 style={props}>{Math.round(progress)}% </animated.h1></Html>
  )
}


export default function Mountain() {

  // const scrollArea = useRef()
  // const onScroll = e => (state.top.current = e.target.scrollTop)
  // useEffect(() => void onScroll({ target: scrollArea.current }), [])


  return (
    <>
      <Canvas 
        mode="concurrent" 
        shadow={true} 
        resize={{ polyfill: ResizeObserver}} 
        pixelRatio={window.devicePixelRatio}
        >  
        <Sky
          distance={20000} // Camera distance (default=450000)
          sunPosition={[0, 1, 0]} // Sun position normal (defaults to inclination and azimuth if not set)
          inclination={0.2} // Sun elevation angle from 0 to 1 (default=0)
          azimuth={0.25} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
          rayleigh={0.5}
        />
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.25} />
          <directionalLight position={[100, 100, -250]} intensity={1} />
          <pointLight position={[10, 200, -250]} intensity={0.5} />
          <fog attach="fog" args={['#88ABC2',  100, 3000]} />
          <Environment files="venice_sunset_1k.hdr" />
          <OrthographicCamera position={[0,-250,-400]} fov={10} aspect={sizes.width/sizes.height} near={100} far={1000}>
            <Scene position={[10, 0, -450]}/>
            <TitleTextMesh />
            <IntroTextMesh />
          </OrthographicCamera>
        </Suspense>
      </Canvas>
      {/* <div ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div> */}
    </>
  );
}
