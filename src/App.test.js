import React from 'react'
import ReactThreeTestRenderer from 'react-three-test-renderer'

const Mesh = () => {
  const meshRef = React.useRef()
  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2]} />
      <meshBasicMaterial />
    </mesh>
  )
}

const renderer = ReactThreeTestRenderer.create(<Mesh />)

expect(renderer.scene.children[0].instance.rotation.x).toEqual(0)

ReactThreeTestRenderer.act(() => {
  renderer.advanceFrames(2, 1)
})

expect(renderer.scene.children[0].instance.rotation.x).toEqual(2)
