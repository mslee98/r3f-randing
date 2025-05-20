import {  
  ScrollControls, 
  Scroll,
  useGLTF,
  useAnimations,
  RoundedBox,
  MeshPortalMaterial,
  useScroll,
  CameraShake,
  Environment,
  FlyControls,
  Edges,
  Grid,
  Text,
  useTexture
  // MeshTransmissionMaterial

} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, forwardRef } from 'react';
import * as THREE from 'three'

import React, { useState } from 'react';

import { useSpring, a } from '@react-spring/three'

const cardList = [
  { text: 'Card 1', color: '#222', src: 'https://picsum.photos/250/250' },
  { text: 'Card 2', color: '#334', src: 'https://picsum.photos/250/250' },
  { text: 'Card 3', color: '#446', src: 'https://picsum.photos/250/250' },
  { text: 'Card 4', color: '#557', src: 'https://picsum.photos/250/250' },
  { text: 'Card 5', color: '#668', src: 'https://picsum.photos/250/250' },
  { text: 'Card 6', color: '#668', src: 'https://picsum.photos/250/250' },
  { text: 'Card 7', color: '#668', src: 'https://picsum.photos/250/250' },
  { text: 'Card 8', color: '#668', src: 'https://picsum.photos/250/250' },
  { text: 'Card 9', color: '#668', src: 'https://picsum.photos/250/250' },
  { text: 'Card 10', color: '#668', src: 'https://picsum.photos/250/250' },
]

function App() {

  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/images/sw-bg-3.jpg', (loadedTexture) => {
      setTexture(loadedTexture);
    });
  }, [])

  return (
    <div className="w-screen h-screen bg-black">
      {/* <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-opacity-30 backdrop-blur-md z-50">
        
        <div className="text-black font-bold text-xl cursor-pointer">
          MIN
        </div>

        
        <nav className="space-x-8 text-black text-lg hidden md:flex">
          <a href="#about" className="hover:text-yellow-400 transition">About</a>
          <a href="#projects" className="hover:text-yellow-400 transition">Projects</a>
          <a href="#contact" className="hover:text-yellow-400 transition">Contact</a>
        </nav>

        
        <div className="flex items-center space-x-4 text-black text-xl">
          <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="#contact"
            className="ml-4 px-4 py-2 bg-yellow-400 text-black rounded-full font-semibold text-base hover:bg-yellow-300 transition"
          >
            연락하기
          </a>
        </div>
      </header> */}

      <Canvas shadows fov={45} camera={{position: [0,0,5]}}>
        <color attach="background" args={["#ececec"]} />

        <ambientLight intensity={0.2} />
        <ScrollControls pages={4} damping={0.15} snap={false}>
          <Scene texture={texture} />
        </ScrollControls>

        {/* <OrbitControls enableZoom={false}/> */}
        <FlyControls
          movementSpeed={5}
          rollSpeed={0.5}
          // dragToLook={true} // hover상태에서 움직이게 하는 옵션임
          autoForward={false}
        />

        <CameraShake
          maxYaw={0.03} // Max amount camera can yaw in either direction
          maxPitch={0.05} // Max amount camera can pitch in either direction
          maxRoll={0.05} // Max amount camera can roll in either direction
          yawFrequency={0.05} // Frequency of the the yaw rotation
          pitchFrequency={0.2} // Frequency of the pitch rotation
          rollFrequency={0.2} // Frequency of the roll rotation
          intensity={0.4} // initial intensity of the shake
          decayRate={0.65} // if decay = true this is the rate at which intensity will reduce at />
        />
        {/* <CustomCursor/> */}
      </Canvas>
    </div>
  );
}


function Scene({ texture }) {
  const scroll = useScroll();
  const { viewport, camera } = useThree();

  const box1Ref = useRef();
  const box2Ref = useRef();

  const materialRef = useRef();

  const outerMatRef = useRef();
  const innerMatRef = useRef();

  const inRange = useRef(false);
  const inRange2 = useRef(false);

  const [paddingHtml, setPaddingHtml] = useState(false);
  const [robotHtml, setRobotHtml] = useState(false);

  useFrame(() => {
    const offset = scroll.offset; // 0 ~ 1  

    // 페이지	offset 범위	가운데 위치 (중심점)
    // 1페이지	0.00 ~ 0.25	0.125
    // 2페이지	0.25 ~ 0.50	0.375
    // 3페이지	0.50 ~ 0.75	0.625
    // 4페이지	0.75 ~ 1.00	0.875
    const colorStops = [
      {
        start: 0.25, end: 0.30,
        from: '#1e1e1e', to: '#2c2c2c', // 탁하고 어두운 배경
        outerFrom: '#a855f7', outerTo: '#f0abfc', // 강한 형광 퍼플 (outer highlight)
        innerFrom: '#e9d5ff', innerTo: '#faf5ff', // 부드럽고 연한 라벤더 핑크 (inner glow)
      },
      {
        start: 0.30, end: 0.35,
        from: '#2c2c2c', to: '#000000', // 더 어두운 배경
        outerFrom: '#00f5d4', outerTo: '#38f9d7', // 형광 민트 (outer highlight)
        innerFrom: '#ccfbf1', innerTo: '#ecfeff', // 연민트/하늘빛 inner glow
      },
      {
        start: 0.35, end: 0.45,
        from: '#1a1a1a', to: '#2f2f2f', // 배경 계속 어두움
        outerFrom: '#fb37ff', outerTo: '#e570ff', // 핑크-보라 outer 라인
        innerFrom: '#ffe3fe', innerTo: '#f9e8ff', // 살짝 따뜻한 핑크빛 glow
      },
      {
        start: 0.45, end: 0.50,
        from: '#2f2f2f', to: '#1e1e1e', // 탁한 어두운 마감 배경
        outerFrom: '#93c5fd', outerTo: '#3b82f6', // 밝은 하늘 파랑 (outer highlight)
        innerFrom: '#dbeafe', innerTo: '#eff6ff', // 부드러운 파랑톤 (inner)
      },
    ];

    const current = colorStops.find(({ start, end }) => offset >= start && offset < end);

    if (current) {
      const { start, end, from, to, outerFrom, outerTo, innerFrom, innerTo } = current;
      const progress = (offset - start) / (end - start);

      // 배경 색상
      if (materialRef.current) {
        materialRef.current.color.lerpColors(new THREE.Color(from), new THREE.Color(to), progress);
      }

      // 외부 패딩
      if (outerMatRef.current) {
        outerMatRef.current.color.lerpColors(new THREE.Color(outerFrom), new THREE.Color(outerTo), progress);
      }

      // 내부 패딩
      if (innerMatRef.current) {
        innerMatRef.current.color.lerpColors(new THREE.Color(innerFrom), new THREE.Color(innerTo), progress);
      }
    }
  
    // 가까운 offset이 있는지 확인
    const zoomTargets = [0.375, 0.625]; // 확대 포인트
    const threshold = 0.3;
    let closestDist = Infinity;
    let targetZ = 8; // 기본 거리

  
    zoomTargets.forEach((snapOffset) => {
      const dist = Math.abs(offset - snapOffset);
      if (dist < closestDist) {
        closestDist = dist;
        if (dist < threshold) {
          const zStrength = 1 - dist / threshold;
          targetZ = 5 - zStrength * 4.3;
        }
      }
    });
  
    camera.position.z += (targetZ - camera.position.z) * 0.1; // 부드럽게 이동

    // 3. 0.45 ~ 0.55 offset 범위 진입 감지 및 반응
    if (offset >= 0.25 && offset <= 0.50) {
      if (!inRange.current) {
        inRange.current = true;

        // 스크롤 DOM 위치를 강제로 설정 (0.5 위치로)
        const scrollEl = scroll.el; // <ScrollControls>의 domElement
        const totalHeight = scrollEl.scrollHeight - scrollEl.clientHeight;
        scrollEl.scrollTop = totalHeight * 0.375;
      }

      // offset이 정확히 0.375 근처일 때만 paddingHtml 활성화
      if (Math.abs(offset - 0.375) < 0.02) {
        setPaddingHtml(true);
      } else {
        setPaddingHtml(false);
      }
    } else {
      inRange.current = false;
      setPaddingHtml(false);
    }


    if (offset >= 0.5 && offset <= 0.75) {
      if (!inRange2.current) {
        inRange2.current = true;

        // 스크롤 DOM 위치를 강제로 설정 (0.5 위치로)
        const scrollEl = scroll.el; // <ScrollControls>의 domElement
        const totalHeight = scrollEl.scrollHeight - scrollEl.clientHeight;
        scrollEl.scrollTop = totalHeight * 0.625;
      }

      // offset이 정확히 0.375 근처일 때만 paddingHtml 활성화
      if (Math.abs(offset - 0.625) < 0.02) {
        setRobotHtml(true);
      } else {
        setRobotHtml(false);
      }
    } else {
      inRange2.current = false;
      setRobotHtml(false);
    }

  });

  const totalWidth = 100;  // 전체 가로 공간 (Three.js 단위)
  const totalHeight = 100;  // 전체 세로 공간

  const columns = 5;       // 열 수 (고정 혹은 동적으로 계산)
  const rows = Math.ceil(cardList.length / columns);

  const spacingX = columns > 1 ? totalWidth / (columns - 1) : 0;
  const spacingY = rows > 1 ? totalHeight / (rows - 1) : 0;

  return (
    <>

      {/* HTML UI 페이지 */}
      <Scroll html className="w-full h-full">
        {/* Section 1 */}
        <div className="h-screen flex justify-center items-center text-2xl bg-white">
          <h1 className="text-black">Scroll Base Animation Test</h1>
        </div>

        {/* Section 2 */}
        <div className={`
            h-screen relative transition-opacity duration-500
            ${paddingHtml ? "opacity-100" : "opacity-0 pointer-events-none"}
            text-white
          `}
        >
          <div className="absolute bottom-6 left-6 max-w-md">
            <p className="text-[64px] font-bold leading-tight mb-4">
              What is Lorem Ipsum?
            </p>
            <p className="text-2xl leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className={`
          h-screen relative transition-opacity duration-500
          ${robotHtml ? "opacity-100" : "opacity-0 pointer-events-none"}
          text-white
        `}>
          <div className="absolute top-1/3 left-6 max-w-md">
            <p className="text-[64px] font-bold leading-tight mb-4">
              Where does it come from?
            </p>
            <p className="text-2xl leading-relaxed">
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
        </div>

      </Scroll>

      {/* 3D Scroll 영역 */}
      <Scroll>
        <RoundedBoxComponent ref={box1Ref} position={[0, -8.8, 0]}>
          <PortalFirstComponent texture={texture} position={[0, 0, -2]} materialRef={materialRef} outerMatRef={outerMatRef} innerMatRef={innerMatRef} />
        </RoundedBoxComponent>

        <RoundedBoxComponent ref={box2Ref} position={[0, -14.6, 0]}>
          <PortalSecondComponent texture={texture} position={[0, 0, -4]} />
        </RoundedBoxComponent>
        {/* <Robot/> */}
      </Scroll>

      <Scroll>
      <directionalLight 
        castShadow 
        position={[5, 10, 5]} 
        intensity={1.2}
      />
      <ambientLight intensity={0.3} />
        <group rotation={[0, -Math.PI / 8, 0]}>
          <Grid 
            position={[0, -26, 0]}
            args={[20, 20]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6f6f6f"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#9d4b4b"
            fadeDistance={30}
            fadeStrength={1}
            infiniteGrid={true}
          />
          
          {/* 그리드 위에 그림자 생성을 위한 플레인 메쉬 */}
          <mesh position={[0, -26.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[500, 500]} />
            <shadowMaterial transparent opacity={0.3} />
          </mesh>

          {/* 카드 목록 */}
          {/* {cardList.map((card, index) => (
            <RoundedBox
              key={index}
              args={[2.5, 1.5, 0.1]}
              radius={0.1}
              smoothness={4}
              position={[index * 3 - 6, -25.5, 0]} // 가로 간격 3씩, 중앙 정렬
              rotation={[-Math.PI / 2, 0, 0]}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial color={card.color} />
              <Text
                position={[0, 0, 0.11]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {card.text}
              </Text>
            </RoundedBox>
          ))} */}
          {/* {cardList.map((card, index) => {
            const col = index % columns
            const row = Math.floor(index / columns)

            const x = col * spacingX - (columns - 1) * spacingX / 2 // 중앙 정렬
            const y = -25.5 - row * spacingY // 아래로 쌓기 (Three.js Y는 위가 +)

            return (
              <Card
                key={index}
                {...card}
                position={[x, y, 0]}
              />
            )
          })} */}
          {cardList.map((card, index) => {
            const col = index % columns;
            const row = Math.floor(index / columns);

            const x = col * spacingX - totalWidth / 2;     // -totalWidth/2로 중앙 정렬
            const z = totalHeight / 2 - row * spacingY;    // 위에서부터 아래로 쌓기

            return (
              <Card
                key={index}
                {...card}
                position={[x, -25.5, z]}
              />
            )
          })}
        </group>

        <Environment preset="city" />
      </Scroll>
    </>
  );
}

const Card = ({ text, color, src, position }) => {
  const texture = useTexture(src)
  const [hovered, setHovered] = useState(false)

  // spring으로 position과 scale을 함께 제어
  const { scale, positionY } = useSpring({
    scale: hovered ? 1.1 : 1,
    positionY: hovered ? position[1] + 0.5 : position[1],
    config: { mass: 1, tension: 200, friction: 20 },
  })

  return (
    <a.group
      scale={scale}
      position-x={position[0]}
      position-y={positionY}
      position-z={position[2]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox
        args={[2.5, 1.5, 0.1]}
        radius={0.1}
        smoothness={4}
        rotation={[-Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial map={texture} />
        <Text
          position={[0, 0, 0.11]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="black"
        >
          {text}
        </Text>
      </RoundedBox>
    </a.group>
  )
}

const RoundedBoxComponent = ({ children, position}, ref) => {
  const { size } = useThree();
  const width = size.width * 0.002;
  const height = size.height * 0.002;

  return (
    <RoundedBox
      ref={ref}
      args={[width, height, 0.1]}
      radius={0.1}
      smoothness={4}
      position={position}
    >
      <meshStandardMaterial color="black" />
      {children}
    </RoundedBox>
  );
};



const PortalFirstComponent = ({materialRef, outerMatRef, innerMatRef}) => {
  return (
    <MeshPortalMaterial side={THREE.DoubleSide}>
       <ambientLight intensity={2} />
       <directionalLight
          position={[5, 6, 5]}
          intensity={1}
          // castShadow
          color="#fff"
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <spotLight
          position={[6, 6, 0]} // 더 우측, 위, 앞쪽
          angle={0.4}          // 더 좁은 각도로 그림자 길이 증가
          intensity={400}       // 너무 밝지 않게 조절
          penumbra={0.4}        // 가장자리 부드럽게
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0005} // 그림자 품질 개선용 미세 오프셋
        />
       <mesh receiveShadow>
          <boxGeometry args={[14,4,7]}/>
          <meshStandardMaterial
            side={THREE.BackSide}
            ref={materialRef} 
          />
       </mesh>
       <Padding outerMatRef={outerMatRef} innerMatRef={innerMatRef}/>
    </MeshPortalMaterial>
  )
}

const PortalSecondComponent = ({ texture }) => {
  const { scene: modelScene } = useGLTF('/models/fighter.glb');
  const modelRef = useRef();
  const robotRef = useRef();

  const scroll = useScroll();

  const { scene, animations } = useGLTF('/models/robot.glb');
  const { actions } = useAnimations(animations, robotRef);

  //3d Glb Model 재질 변경
  useEffect(() => {
    modelScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
  
        child.material = new THREE.MeshStandardMaterial({
          map: child.material.map,
          color: child.material.color || new THREE.Color(0xffffff),
          roughness: 0.4,
          metalness: 0.3,
        });
      }
    });
  
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
  
        child.material = new THREE.MeshStandardMaterial({
          map: child.material.map,
          color: child.material.color || new THREE.Color(0xffffff),
          roughness: 0.5,
          metalness: 0.3,
        });
      }
    });
  }, [modelScene, scene]);

  //Robot animation
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]].play();
    }
  }, [actions]);


  useFrame(() => {
    const offset = scroll.offset;

    let targetPosition;
    let targetRotationZ = 0;
    let hasTarget = false;

    if (offset < 0.525) {
      // 왼쪽(초기) 구간
      targetPosition = new THREE.Vector3(8, 0, -8);
      targetRotationZ = Math.PI / 6; 
      hasTarget = true;
    } else if (Math.abs(offset - 0.625) < 0.01) {
      // 중간 구간 (정확히 0.625 근처)
      targetPosition = new THREE.Vector3(0.3, 0, -2);
      targetRotationZ = Math.PI / 3; 
      hasTarget = true;
    } else if (offset > 0.625) {
      // 오른쪽(마지막) 구간
      targetPosition = new THREE.Vector3(-2, 0, 2);
      targetRotationZ = Math.PI; 
      hasTarget = true;
    } 

    // const targetPosition =
    //   Math.abs(offset - 0.625) < 0.02
    //     ? new THREE.Vector3(0.3, 0, -2)
    //     : new THREE.Vector3(8, 0, -8);

    const targetLookAt = new THREE.Vector3(-2, 0, 3);

    // 모델 위치 부드럽게 이동
    if (modelRef.current && hasTarget) {
      modelRef.current.position.lerp(targetPosition, 0.1);

      const direction = new THREE.Vector3();
      direction.subVectors(targetLookAt, modelRef.current.position).normalize();
      modelRef.current.lookAt(modelRef.current.position.clone().add(direction));

      // 회전
      modelRef.current.rotation.z += (targetRotationZ - modelRef.current.rotation.z) * 0.5;
 
    }
  });

  useFrame(() => {
    const offset =scroll.offset;

    let targetPosition;

    if (offset < 0.525) {
      targetPosition = new THREE.Vector3(0, -5, -2);
    } else if (Math.abs(offset - 0.625) < 0.01) {
      targetPosition = new THREE.Vector3(0.3, -0.5, -0.5);
    } else if (offset > 0.635) {
      targetPosition = new THREE.Vector3(0.3, 5, 0.5);
    } 

    // const targetPosition = 
    // Math.abs(offset - 0.625) < 0.02
    //   ? new THREE.Vector3(0.3,-0.5, -0.5)
    //   : new THREE.Vector3(0, -5, -2);

      const targetLookAt = new THREE.Vector3(-4, 0, 3);

      if(robotRef.current && targetPosition) {
        robotRef.current.position.lerp(targetPosition, 0.1);

        const direction = new THREE.Vector3();
        direction.subVectors(targetLookAt, robotRef.current.position).normalize();
        robotRef.current.lookAt(robotRef.current.position.clone().add(direction));
      }
  })

  return (
    <>
      <MeshPortalMaterial side={THREE.DoubleSide}>
        <ambientLight intensity={0.4} />
        <directionalLight
          color={0xffffff}
          intensity={1.5}
          position={[5, 10, 5]}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <directionalLight
          color="red"
          intensity={10}
          position={[0, -2, 0]}
        />

        {/* 💡 주변 채우기용 Point Light */}
        <pointLight
          color={0xffffff}
          intensity={0.5}
          position={[0, 2, 2]}
          distance={10}
          decay={2}
        />

        <Environment preset="sunset" />

        {texture && (
          <mesh position={[0, 0, -5]}>
            <planeGeometry args={[20, 12]} />
            <meshStandardMaterial
              map={texture}
              transparent
              opacity={0.95}
            />
          </mesh>
        )}

        {/* <primitive ref={modelRef} object={modelScene} position={[8, 0, -8]} scale={[1, 1, 1]} /> */}
        <primitive ref={modelRef} object={modelScene} position={[8, 0, -8]} scale={[0.6, 0.6, 0.6]} />

        <group ref={robotRef} scale={[0.1, 0.1, 0.1]} position={[0, -20, 0]}>
          <primitive object={scene} />
        </group>
      

      {/* <color attach="background" args={["e4cdac"]} /> */}
    </MeshPortalMaterial>
    </>
    
  );
};


function Padding({outerMatRef, innerMatRef}) {
  const groupRef = useRef();

  const { scene, animations } = useGLTF('/models/padding.glb');
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (actions && actions[Object.keys(actions)[0]]) {
      actions[Object.keys(actions)[0]].play();
    }
  }, [actions]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.depthWrite = true;

        if (child.name === 'Puffer_(open)010') {
          innerMatRef.current = child.material;
        }

        if (child.name === 'Puffer_(open)010_1') {
          outerMatRef.current = child.material;
        }
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef} scale={[2, 2, 2]} position={[0,-3,-3]}>
      <primitive object={scene} castShadow/>
    </group>
  )
}

// function CustomCursor() {
//   const meshRef = useRef()
//   const { viewport, mouse } = useThree()
//   const velocity = useRef(new THREE.Vector3())
//   const target = new THREE.Vector3()

//   useFrame((state, delta) => {
//     if (!meshRef.current) return

//     // 마우스 좌표를 월드 좌표로 변환
//     target.set(mouse.x * viewport.width / 2, mouse.y * viewport.height / 2, 0)

//     // 탄성 움직임 (Spring-like physics)
//     const damping = 10     // 감쇠 계수
//     const stiffness = 100  // 탄성 계수

//     const current = meshRef.current.position
//     const force = target.clone().sub(current).multiplyScalar(stiffness)
//     velocity.current.add(force.multiplyScalar(delta))
//     velocity.current.multiplyScalar(Math.exp(-damping * delta)) // 감쇠

//     current.add(velocity.current.clone().multiplyScalar(delta))

//     // 젤리처럼 진동하는 scale
//     const t = state.clock.getElapsedTime()
//     const scale = 1 + Math.sin(t * 6) * 0.05
//     meshRef.current.scale.set(scale, scale, scale)
//   })

//   return (
//     <mesh ref={meshRef}>
//       <sphereGeometry args={[0.1, 32, 32]} />
//       <MeshTransmissionMaterial
//         backside
//         samples={32}
//         resolution={1024}
//         thickness={0.8}                // 더 얇게
//         transmission={1}              // 완전히 투명
//         roughness={0.01}              // 거의 거칠지 않게 → 매끄러운 표면
//         ior={1.3}                     // 물처럼 약한 굴절 (유리는 1.5~1.8)
//         chromaticAberration={0.01}    // 색 분산 효과를 아주 약하게
//         anisotropy={0.1}              // 표면의 방향성 미세 조정
//         distortion={0.05}             // 왜곡 거의 없음
//         distortionScale={0.05}        // 왜곡의 세기도 낮게
//         temporalDistortion={0.05}     // 시간에 따른 왜곡도 은은하게
//         clearcoat={1}                 // 유광코팅
//         clearcoatRoughness={0.01}     // 유광 표면을 더 매끄럽게
//       />
//     </mesh>
//   )
// }

// const Robot = forwardRef(({ robotRef }) => {
//   const groupRef = useRef(); // 애니메이션용 내부 ref
//   const { scene, animations } = useGLTF('/models/robot.glb');
//   const { actions } = useAnimations(animations, groupRef); // ✅ 내부 ref로 애니메이션 컨트롤

//   useEffect(() => {
//     if (actions && Object.keys(actions).length > 0) {
//       actions[Object.keys(actions)[0]].play();
//     }
//   }, [actions]);

//   // 부모에서 넘긴 robotRef에는 외부 제어용 위치 ref를 연결
//   // useEffect(() => {
//   //   if (robotRef) {
//   //     robotRef.current = groupRef.current;
      
//   //   }
//   // }, [robotRef]);


//   return (
//     <group ref={groupRef} scale={[0.5, 0.5, 0.5]} position={[0, -10, 0]}>
//       <primitive object={scene} />
//     </group>
//   );
// })



export default App;
