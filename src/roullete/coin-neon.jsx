
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function CoinNeon(props) {
  const { nodes, materials } = useGLTF('/roulette-neon-transformed.glb')


  return (
    <group {...props} onPointerOver={props.onPointerOver} ref={props.ref} scale={0.015}>
        <mesh geometry={nodes['Tube004_14_-_Default_0001_1'].geometry} material={materials.Material_161_Tube004} />
        <mesh geometry={nodes['Tube004_14_-_Default_0001_2'].geometry}  material={materials[props.pos? '14_-_Default' : '14_-_Default.001']} />
        <mesh geometry={nodes['Tube004_14_-_Default_0001_3'].geometry} material={materials.Material_161_Tube004} />
    </group>
  )
}

useGLTF.preload('/roulette-neon-transformed.glb')
