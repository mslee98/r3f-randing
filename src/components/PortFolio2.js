import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useScroll } from '@react-three/drei';

function TypingText({ fullText = '안녕하세요', interval = 100, onComplete }) {
  const [visibleText, setVisibleText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    const typingTimer = setInterval(() => {
      const currentIndex = indexRef.current;
      if (currentIndex < fullText.length) {
        setVisibleText((prev) => prev + fullText[currentIndex]);
        indexRef.current += 1;
      } else {
        clearInterval(typingTimer);
        onComplete?.();
      }
    }, interval);

    return () => clearInterval(typingTimer);
  }, [fullText, interval, onComplete]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

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
  );
}

function PortPolio2() {
  const [typingDone, setTypingDone] = useState(false);
  const scroll = useScroll();

  useEffect(() => {
    if (typingDone) {
      // 자동으로 스크롤하여 2페이지로 이동
      setTimeout(() => {
        scroll.scrollTo(1); // 1 = 두 번째 페이지
      }, 800);
    }
  }, [typingDone, scroll]);

  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <color attach="background" args={['#0f0c29']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        <group position={[0, 0, 0]}>
          <TypingText
            fullText="안녕하세요, 저는 프론트엔드 개발자입니다."
            onComplete={() => {
              setTypingDone(true);
            }}
          />
        </group>
      </Canvas>
    </div>
  );
}

export default PortPolio2;
