import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Environment, Lightformer } from '@react-three/drei'

export const Effects = () => {
  return (
    <>
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.1} intensity={1} />
      </EffectComposer>
      <Environment resolution={512}>
        {/* Ceiling */}
        <Lightformer intensity={3} rotation-x={Math.PI / 2} position={[0, 4, -10]} scale={[1, 1, 1]} />
        <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[15, 1, 1]} />
        <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[15, 1, 1]} />
        <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[15, 1, 1]} />
        <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[15, 1, 1]} />
        <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[15, 1, 1]} />
        <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 4, 18]} scale={[15, 1, 1]} />
        {/* Sides */}
        <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} />
        <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
        {/* Key */}
      </Environment>
    </>
  )
}
