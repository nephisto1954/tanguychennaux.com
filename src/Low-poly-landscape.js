/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF} from '@react-three/drei'

export default function LowPoly(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/low-poly-landscape.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Landscape_1.geometry} material={materials.grass} />
      <mesh geometry={nodes.Landscape_2.geometry} material={materials.mountain} />
      <mesh geometry={nodes.Landscape_3.geometry} material={materials.snow} />
      <mesh geometry={nodes.lake.geometry} material={materials['Material.002']} />
    </group>
  )
}

useGLTF.preload('../public/low-poly-landscape.glb')
