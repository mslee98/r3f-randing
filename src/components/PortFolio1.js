import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useState, useEffect, useRef } from 'react'
import { Text, OrbitControls, ScrollControls, Scroll, Environment } from '@react-three/drei'
import * as THREE from 'three'

import { MeshTransmissionMaterial } from '@react-three/drei' // 젤리 재질

import { useScroll } from '@react-three/drei'

function TypingText({ fullText = '안녕하세요', interval = 200, onComplete }) {
  const [visibleText, setVisibleText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const indexRef = useRef(0)

  // 타이핑 애니메이션
  useEffect(() => {
    const typingTimer = setInterval(() => {
      const currentIndex = indexRef.current
      if (currentIndex < fullText.length) {
        setVisibleText((prev) => prev + fullText[currentIndex])
        indexRef.current += 1
      } else {
        clearInterval(typingTimer)
        onComplete?.()
      }
    }, interval)

    return () => clearInterval(typingTimer)
  }, [fullText, interval, onComplete])

  // 커서 깜빡임
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <Text
      font="/fonts/Moneygraphy-Rounded.ttf"
      fontSize={1}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      {visibleText + (showCursor ? '|' : '')}
    </Text>
  )
}

function PortFolio1() {
  const [typingDone, setTypingDone] = useState(false)
  const scrollRef = useRef()

  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <color attach="background" args={['#0f0c29']} />
        <Environment preset="sunset" background={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        <ScrollControls pages={2} damping={0.1} ref={scrollRef}>
          <Scroll>
            <TypingText fullText="안녕하세요, 개발 외주가 필요하신가요?" />
          </Scroll>
          
        </ScrollControls>

        <CustomCursor />
      </Canvas>
    </div>
  )
}

function CustomCursor() {
  const meshRef = useRef()
  const { viewport, mouse } = useThree()
  const velocity = useRef(new THREE.Vector3())
  const target = new THREE.Vector3()

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // 마우스 좌표를 월드 좌표로 변환
    target.set(mouse.x * viewport.width / 2, mouse.y * viewport.height / 2, 0)

    // 탄성 움직임 (Spring-like physics)
    const damping = 10     // 감쇠 계수
    const stiffness = 100  // 탄성 계수

    const current = meshRef.current.position
    const force = target.clone().sub(current).multiplyScalar(stiffness)
    velocity.current.add(force.multiplyScalar(delta))
    velocity.current.multiplyScalar(Math.exp(-damping * delta)) // 감쇠

    current.add(velocity.current.clone().multiplyScalar(delta))

    // 젤리처럼 진동하는 scale
    const t = state.clock.getElapsedTime()
    const scale = 1 + Math.sin(t * 6) * 0.05
    meshRef.current.scale.set(scale, scale, scale)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshTransmissionMaterial
        backside
        samples={32}
        resolution={1024}
        thickness={0.8}                // 더 얇게
        transmission={1}              // 완전히 투명
        roughness={0.01}              // 거의 거칠지 않게 → 매끄러운 표면
        ior={1.3}                     // 물처럼 약한 굴절 (유리는 1.5~1.8)
        chromaticAberration={0.01}    // 색 분산 효과를 아주 약하게
        anisotropy={0.1}              // 표면의 방향성 미세 조정
        distortion={0.05}             // 왜곡 거의 없음
        distortionScale={0.05}        // 왜곡의 세기도 낮게
        temporalDistortion={0.05}     // 시간에 따른 왜곡도 은은하게
        clearcoat={1}                 // 유광코팅
        clearcoatRoughness={0.01}     // 유광 표면을 더 매끄럽게
      />
    </mesh>
  )
}

export default PortFolio1;
