'use client';

import { OrbitControls, Text, useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import type { DirectionalLight, Mesh } from 'three';

import { Colors } from '@/helpers/makeRgbaColor';

const vertices = [
    [1, 1.628, 0], // 1.618 - золотое сечение +.01 для высоты
    [-1, 1.628, 0],
    [1, -1.628, 0],
    [-1, -1.628, 0],
    [0, 1, 1.628],
    [0, -1, 1.628],
    [0, 1, -1.628],
    [0, -1, -1.628],
    [1.628, 0, 1],
    [-1.628, 0, 1],
    [1.628, 0, -1],
    [-1.628, 0, -1],
] as const;

export default function Icosahedron({
    textVertices,
    setIsIcosahedronMounted,
}: {
    textVertices: readonly string[];
    setIsIcosahedronMounted?: (value: boolean) => void;
}) {
    const meshRef = useRef<Mesh>(null!);
    const dirLig = useRef<DirectionalLight>(null!);

    const [isDrag, setIsDrag] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [canGrab, setCanGrab] = useState(false);

    const getIsMobile = () => {
        return window.matchMedia(`(max-width: ${1000}px)`).matches;
    };

    useCursor(hovered, 'grab');
    useEffect(() => {
        if (setIsIcosahedronMounted) {
            setIsIcosahedronMounted(true);
        }

        const handleResize = () => {
            setCanGrab(!getIsMobile());
        };
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useFrame(({ camera }) => {
        meshRef.current.children.forEach((vertex) => {
            vertex.lookAt(camera.position);
            dirLig.current.position.set(
                camera.position.x,
                camera.position.y,
                camera.position.z,
            );
        });

        if (isDrag === false) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <>
            <mesh
                ref={meshRef}
                onPointerOver={() =>
                    getIsMobile() ? setHovered(false) : setHovered(true)
                }
                onPointerOut={() => setHovered(false)}
            >
                <icosahedronGeometry args={[2, 0]} />
                <meshStandardMaterial
                    roughness={1}
                    color={Colors.TEXT_ACCENT}
                    wireframe
                />
                {vertices.map((vertex, i) => (
                    <mesh key={i} position={vertex}>
                        <meshStandardMaterial
                            attach="material"
                            metalness={0}
                            roughness={1}
                            transparent
                            opacity={1}
                        />
                        <Text
                            font="/fonts/coolveticaRg.ttf"
                            fontSize={0.3}
                            color={Colors.TEXT_ACCENT_DARK}
                        >
                            {textVertices[i]}
                        </Text>
                    </mesh>
                ))}
                {canGrab && (
                    <OrbitControls
                        onStart={() => setIsDrag(true)}
                        onEnd={() => setIsDrag(false)}
                        enableZoom={false}
                    />
                )}
            </mesh>
            <directionalLight
                ref={dirLig}
                position={[-2, 3, 4]}
                intensity={1.5}
            />
        </>
    );
}
