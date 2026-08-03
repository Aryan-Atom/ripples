import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html, useAnimations, useGLTF, useProgress } from '@react-three/drei'
import * as THREE from 'three'

export const FOUNTAIN_MODEL_URL = '/models/fountain_water_simulation.glb'

function SceneLoader() {
  const { progress, active, errors } = useProgress()
  const done = !active && progress === 100 && errors.length === 0
  if (done) return null

  return (
    <Html fullscreen zIndexRange={[30, 0]}>
      <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center bg-void">
        <p className="font-display text-2xl uppercase tracking-[0.08em] text-mist">
          {errors.length ? 'Model failed to load' : 'Loading fountain'}
        </p>
        {!errors.length && (
          <>
            <div className="mt-6 h-px w-52 overflow-hidden bg-white/10">
              <div
                className="h-full origin-left bg-gold"
                style={{
                  transform: `scaleX(${Math.max(0.03, progress / 100)})`,
                }}
              />
            </div>
            <p className="mt-3 font-body text-[0.65rem] uppercase tracking-[0.15em] text-gold">
              {Math.round(progress)}%
            </p>
          </>
        )}
      </div>
    </Html>
  )
}

function FountainModel({ stateRef, url }) {
  const { camera } = useThree()
  const { scene, animations } = useGLTF(url)

  // Use cached scene (no clone) so skinned water clips stay bound
  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (!obj.isMesh) return
      obj.castShadow = false
      obj.receiveShadow = false
      obj.frustumCulled = false
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
      mats.forEach((mat) => {
        if (!mat) return
        mat.side = THREE.DoubleSide
        mat.toneMapped = true
        if (mat.map) mat.map.anisotropy = 4
      })
    })
  }, [scene])

  const group = useRef()
  const { actions, names } = useAnimations(animations, group)
  const lookTarget = useMemo(() => new THREE.Vector3(0, 2.1, 0), [])
  const goalPos = useMemo(() => new THREE.Vector3(), [])
  const goalLook = useMemo(() => new THREE.Vector3(), [])
  const gold = useRef()
  const teal = useRef()
  const warm = useRef()
  const seeded = useRef(false)

  useLayoutEffect(() => {
    const g = group.current
    if (!g) return
    // Reset wrap each mount so fit is idempotent across HMR
    g.position.set(0, 0, 0)
    g.scale.setScalar(1)
    g.updateWorldMatrix(true, true)
    const box = new THREE.Box3().setFromObject(g)
    if (box.isEmpty()) return
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z, 0.001)
    const scale = 14 / maxDim
    g.scale.setScalar(scale)
    g.position.copy(center).multiplyScalar(-scale)
    g.position.y += 0.15
  }, [scene])

  useEffect(() => {
    if (!names.length) {
      console.warn('[Fountain] No clips in GLB', url)
      return
    }
    const running = names.map((name) => {
      const action = actions[name]
      if (!action) return null
      action.reset()
      action.setLoop(THREE.LoopRepeat, Infinity)
      action.clampWhenFinished = false
      action.enabled = true
      action.setEffectiveWeight(1)
      action.setEffectiveTimeScale(1.85)
      action.play()
      return action
    })
    return () => {
      running.forEach((a) => a?.stop())
    }
  }, [actions, names, url])

  useFrame((_, dt) => {
    const s = stateRef.current
    if (!s) return

    goalPos.set(s.x, s.y, s.z)
    goalLook.set(s.tx, s.ty, s.tz)

    // Seed hard once so the first frame isn't a distant lerp from default cam
    if (!seeded.current) {
      camera.position.copy(goalPos)
      lookTarget.copy(goalLook)
      camera.fov = s.fov ?? 44
      seeded.current = true
    } else {
      // Frame-rate independent damp — softens scrub into cinematic arcs
      const k = 1 - Math.exp(-7.5 * Math.min(dt, 0.05))
      camera.position.lerp(goalPos, k)
      lookTarget.lerp(goalLook, k)
      camera.fov = THREE.MathUtils.lerp(camera.fov, s.fov ?? 44, k)
    }

    camera.lookAt(lookTarget)
    camera.updateProjectionMatrix()

    if (gold.current) {
      gold.current.intensity = THREE.MathUtils.lerp(
        gold.current.intensity,
        s.iGold,
        0.12,
      )
    }
    if (teal.current) {
      teal.current.intensity = THREE.MathUtils.lerp(
        teal.current.intensity,
        s.iTeal,
        0.12,
      )
    }
    if (warm.current) {
      warm.current.intensity = THREE.MathUtils.lerp(
        warm.current.intensity,
        s.iWarm,
        0.12,
      )
    }
  })

  return (
    <>
      <ambientLight intensity={0.42} color="#EDE6D6" />
      <hemisphereLight intensity={0.55} color="#FFF6E0" groundColor="#0A1214" />
      <directionalLight position={[6, 10, 4]} intensity={1.55} color="#FFF1C9" />
      <directionalLight position={[-4, 3, -6]} intensity={0.45} color="#4FB8C4" />
      <spotLight
        ref={gold}
        color="#C9A227"
        position={[5, 7, 4]}
        angle={0.55}
        penumbra={0.5}
        intensity={1.8}
        distance={60}
      />
      <spotLight
        ref={teal}
        color="#4FB8C4"
        position={[-6, 5, -3]}
        angle={0.5}
        penumbra={0.6}
        intensity={1.1}
        distance={60}
      />
      <spotLight
        ref={warm}
        color="#FAF8F5"
        position={[0, 9, -5]}
        angle={0.7}
        penumbra={0.45}
        intensity={0.9}
        distance={70}
      />
      <group ref={group}>
        <primitive object={scene} />
      </group>
    </>
  )
}

export default function FountainExperience({
  stateRef,
  modelUrl = FOUNTAIN_MODEL_URL,
}) {
  return (
    <>
      <color attach="background" args={['#080A0C']} />
      <fog attach="fog" args={['#080A0C', 20, 48]} />
      <SceneLoader />
      <Suspense fallback={null}>
        <FountainModel stateRef={stateRef} url={modelUrl} />
      </Suspense>
    </>
  )
}

/* ponytail: no eager preload of ~70MB GLB — section gates load on approach */
