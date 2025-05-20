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
  { text: 'Card 1', color: '#222', src: '/images/sample-01.png' },
  { text: 'Card 2', color: '#334', src: '/images/sample-01.png' },
  { text: 'Card 3', color: '#446', src: '/images/sample-01.png' },
  { text: 'Card 4', color: '#557', src: '/images/sample-01.png' },
  { text: 'Card 5', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 6', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 7', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 8', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 9', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 10', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 11', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 12', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 13', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 14', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 15', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 16', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 17', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 18', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 19', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 20', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 21', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 22', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 23', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 24', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 25', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 26', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 27', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 28', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 29', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 30', color: '#668', src: '/images/sample-01.png' },
  { text: 'Card 31', color: '#668', src: '/images/sample-01.png' },
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

function easeOutBounce(x) {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
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

  const cardRefs = useRef([]);
  const setCardRef = (el, i) => {
    if (el) cardRefs.current[i] = el;
  };

  const cardDelays = useRef([]);

  useEffect(() => {
    if (cardRefs.current.length > 0 && cardDelays.current.length === 0) {
      cardDelays.current = cardRefs.current.map(() => Math.random() * 0.3); // 0 ~ 0.3초 사이 랜덤 딜레이
    }
  }, []);

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

    if (offset >= 0.75 && offset <= 1) {
      const progress = (offset - 0.75) / (0.99 - 0.75);
      const startY = -15;
      const endY = -26.8;
    
      cardRefs.current.forEach((ref, i) => {
        if (!ref) return;
      
        const delay = cardDelays.current[i] ?? 0;
        const localProgress = Math.max(0, progress - delay);
        const clamped = Math.min(1, localProgress);

        if (clamped <= 0) {
          ref.visible = false;
        } else {
          ref.visible = true;
        }
      
        if (offset >= 0.995 || clamped >= 1) {
          ref.position.y = endY;
          ref.rotation.x = 0;
          ref.rotation.z = 0;
          ref.scale.set(1, 1, 1); // 정상 크기로 고정
        } else {
          const bounceProgress = easeOutBounce(clamped);
          const targetY = THREE.MathUtils.lerp(startY, endY, bounceProgress);
          ref.position.y = THREE.MathUtils.lerp(ref.position.y, targetY, 0.15);
      
          // 회전 효과
          const maxRotation = 0.5;
          ref.rotation.x = Math.sin(clamped * Math.PI * 2) * maxRotation * (1 - clamped);
          ref.rotation.z = Math.cos(clamped * Math.PI * 2) * maxRotation * (1 - clamped);
      
          // 스케일 줄였다가 회복 (0.95 ~ 1 사이로)
          const scale = THREE.MathUtils.lerp(1.4, 1, bounceProgress);
          ref.scale.set(scale, scale, scale);
        }
      });
    }
  });

  const totalWidth = 25;  // 전체 가로 공간 (Three.js 단위)
  const totalHeight = 15;  // 전체 세로 공간

  const columns = 8;       // 열 수 (고정 혹은 동적으로 계산)
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
        <ambientLight intensity={0.1} />
        <group rotation={[0, Math.PI / 4, 0]}>
          <Grid 
            position={[0, -27, 0]}
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
          <mesh position={[0, -27.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[500, 500]} />
            <shadowMaterial transparent opacity={0.3} />
          </mesh>

          {cardList.map((card, index) => {
            const col = index % columns;
            const row = Math.floor(index / columns);

            const x = col * spacingX - totalWidth / 2;     // -totalWidth/2로 중앙 정렬
            const z = totalHeight / 2 - row * spacingY;    // 위에서부터 아래로 쌓기

            return (
              <Card
                key={index}
                ref={(el) => setCardRef(el, index)}
                {...card}
                // position={[x, -26.8, z]}
                position={[x, -20, z]}
              />
            )
          })}
        </group>

        <Environment preset="sunset" />
      </Scroll>
    </>
  );
}

const Card = forwardRef(({ text, color, src, position }, ref) => {
  const texture = useTexture(src)

  // useEffect(() => {
  //   if (!texture) return;
  
  //   texture.anisotropy = 16;
  //   texture.minFilter = THREE.LinearMipMapLinearFilter;  // 선형 보간 + Mipmap 사용
  //   texture.magFilter = THREE.LinearFilter;              // 확대 시 선형 보간
  //   // texture.encoding = THREE.sRGBEncoding;
  //   texture.generateMipmaps = true;                       // Mipmap 활성화
  //   // texture.needsUpdate = true;

  //   // texture.rotation = -Math.PI / 2;
  //   // texture.center.set(0.5, 0.5);  // 회전 중심을 텍스처 중앙으로 설정

  //   texture.rotation = Math.PI / 2;
  //   texture.center.set(0.5, 0.5);

  //   texture.needsUpdate = true;
  // }, [texture]);



  return (
    <a.group
      ref={ref}
      position-x={position[0]}
      position-y={position[1]}
      position-z={position[2]}
    >
      <mesh >
        <boxGeometry
          args={[3, 0.1, 4]}
          rotation={[-Math.PI / 4, 0, 0]}
        />
        <meshStandardMaterial map={texture}/>
      </mesh>
      {/* <RoundedBox
        args={[3, 4, 0.1]}
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
      </RoundedBox> */}
    </a.group>
  )
})

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


export default App;
