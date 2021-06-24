import ReactThreeTestRenderer from '@react-three/test-renderer'

const renderer = await ReactThreeTestRenderer.create(
  <mesh>
    <boxBufferGeometry args={[2, 2]} />
    <meshStandardMaterial
      args={[
        {
          color: 0x0000ff,
        },
      ]}
    />
  </mesh>,
)

// assertions using the TestInstance & Scene Graph
console.log(renderer.toGraph())
