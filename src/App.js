import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Text } from '@react-three/drei';
import { easing } from 'maath';
import { CoinNeon } from './roullete/coin-neon';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Effects } from './scene/effects';
import * as TWEEN from '@tweenjs/tween.js';

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
    );
}

function Rig(props) {
    const ref = useRef();
    const [rotating, setRotating] = useState(true);
    const [landedIndex, setLandedIndex] = useState(null);

    useEffect(() => {
        const randomTarget = 15;
        const targetRotation = (randomTarget / 15) * Math.PI * 2;
        console.log("Random Target:", randomTarget);

        // Start infinite rotation
        const startRotation = ref.current.rotation.y;
        const infiniteRotation = { rotation: startRotation };

        const infiniteTween = new TWEEN.Tween(infiniteRotation)
            .to({ rotation: startRotation + Math.PI * 1000 }, 5000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                ref.current.rotation.y = infiniteRotation.rotation;
            })
            .start();

        // Decelerate and stop at target rotation
        infiniteTween.onComplete(() => {
            const finalRotation = { rotation: ref.current.rotation.y % (Math.PI * 2) };

            new TWEEN.Tween(finalRotation)
                .to({ rotation: finalRotation.rotation + targetRotation }, 2000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(() => {
                    ref.current.rotation.y = finalRotation.rotation;
                })
                .onComplete(() => {
                    const landedIndex = (Math.round(finalRotation.rotation / ((2 * Math.PI) / 15)) % 15) + 1;
                    setLandedIndex(landedIndex);
                    console.log("Landed Index:", landedIndex);
                })
                .start();
        });

        setRotating(false);
    }, []);

    useFrame((state, delta) => {
        TWEEN.update();

        state.events.update();
        state.camera.lookAt(0, 0, 0);
        easing.damp3(state.camera.position, [-state.pointer.x, state.pointer.y + 1, 15], 0.1, delta); // Move camera
    });

    return <group ref={ref} {...props} />;
}

function Carousel({ radius = 2, count = 15 }) {
    return Array.from({ length: count }, (_, i) => (
        <Card
            key={i}
            pos={(i % 2 === 0)}
            index={count - i} // Adjust the index to be in reverse order
            url={`/img${i}_.jpg`}
            position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
            rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
        />
    ));
}

function Card({ url, index, ...props }) {
    const [hovered, hover] = useState(false);
    const pointerOver = (e) => (e.stopPropagation(), hover(true));
    const pointerOut = () => hover(false);
    const { pos, ...propsss } = props;
    return (
        <group {...propsss}>
            <Text
                position={[0, 1.5, 0]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {index}
            </Text>
            <CoinNeon url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} pos={index === 15 ? 'wfla' : pos} />
        </group>
    );
}
