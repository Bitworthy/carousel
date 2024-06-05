import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function CoinNeon(props) {
    const { nodes, materials } = useGLTF('/roulette-neon-transformed.glb');

    // Define the neon gold material
    const neonGoldMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xffd700),
        emissive: new THREE.Color(0xffd700),
        emissiveIntensity: 0.6,
        metalness: 1.0,
        roughness: 0.2,
    });

    let material = props.pos ? '14_-_Default' : '14_-_Default.001';

    // Check if pos is 'wfla' and apply the neon gold material
    const materialToUse = props.pos === 'wfla' ? neonGoldMaterial : materials[material];

    return (
        <group {...props} onPointerOver={props.onPointerOver} ref={props.ref} scale={0.015}>
            <mesh geometry={nodes['Tube004_14_-_Default_0001_1'].geometry} material={materials.Material_161_Tube004} />
            <mesh geometry={nodes['Tube004_14_-_Default_0001_2'].geometry} material={materialToUse} />
            <mesh geometry={nodes['Tube004_14_-_Default_0001_3'].geometry} material={materials.Material_161_Tube004} />
        </group>
    );
}

useGLTF.preload('/roulette-neon-transformed.glb');
