import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, Environment, ScrollControls, useScroll, useTexture, OrbitControls, Lightformer } from '@react-three/drei'
import { easing } from 'maath'
import './util'
import { CoinNeon } from './roullete/coin-neon'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Effects } from './scene/effects'

export const App = () => {
  return (
    <Canvas camera={{ position: [0, 0, 400], fov: 15 }} gl={{ logarithmicDepthBuffer: true, antialias: false }} dpr={[1, 1.5]}>
      <color attach="background" args={['#15151a']} />

      <ambientLight />
      <hemisphereLight intensity={5.5} />

      <ScrollControls pages={2} infinite>
        <Rig rotation={[0, 0, 0]}>
          <Carousel />
          <Effects />
        </Rig>
      </ScrollControls>

    </Canvas>
  )
}

function Rig(props) {
  const ref = useRef()
  const scroll = useScroll()

  useFrame((state, delta) => {
    ref.current.rotation.y = scroll.offset * (Math.PI * 2) // Rotate contents
    state.events.update() // Raycasts every frame rather than on pointer-move
    easing.damp3(state.camera.position, [-state.pointer.x, state.pointer.y + 1, 15], 0.1, delta) // Move camera
    state.camera.lookAt(0, 0, 0) // Look at center
  })

  return <group ref={ref} {...props} />
}

function Carousel({ radius = 2, count = 15 }) {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      pos={(i % 2 === 0)}
      url={`/img${Math.floor(i % 10) + 1}_.jpg`}
      position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
      rotation={[
        0,
        Math.PI + (i / count) * Math.PI * 2,
        0]}
    />
  ))
}

function Card({ url, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const pointerOver = (e) => (e.stopPropagation(), hover(true))
  const pointerOut = () => hover(false)

  return <CoinNeon ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} {...props} />
}

