import { OrbitControls, Text, useCursor, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from 'react';
import { DirectionalLightHelper } from "three";
import { skills, vertices } from "./data";
import { colors } from "../../../../utils/colors";
import { checkDevice } from "../../../../utils/checkDevice";

export default function SkillsIcosahedron() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const dirLig = useRef<THREE.DirectionalLight>(null!);
    const [isDrag, setIsDrag] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [canGrab, setCanGrab] = useState(false);
    useCursor(hovered, "grab");
    useHelper(dirLig, DirectionalLightHelper);

    useFrame(({ camera }) => {
        meshRef.current.children.forEach((child) => {
            child.lookAt(camera.position);
            dirLig.current.position.set(camera.position.x, camera.position.y, camera.position.z);
        });

        if (isDrag === false) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    })

    useEffect(() => {
        const handleResize = () => {
            const isMobile = checkDevice("mobile");
            setCanGrab(!isMobile);
        }
        handleResize()

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    const onPointer = useCallback((bool: boolean) => {
        canGrab && setHovered(bool)
    }, [canGrab])

    return (
        <>
            <mesh ref={meshRef} onPointerOver={() => onPointer(true)} onPointerOut={() => onPointer(false)}>
                <icosahedronGeometry args={[2, 0]} />
                <meshStandardMaterial roughness={1} color={colors.cyan} wireframe />
                {vertices.map((v, i) => (
                    <mesh key={i} position={v as unknown as THREE.Vector3}>
                        <meshStandardMaterial attach="material" metalness={0} roughness={1} transparent opacity={1} />
                        <Text font="/fonts/coolveticaRg.ttf" fontSize={.3} color={colors.cyanDark}>{skills[i]}</Text>
                    </mesh>
                ))}
                {canGrab && <OrbitControls onStart={() => setIsDrag(true)} onEnd={() => setIsDrag(false)} enableZoom={false} />}
            </mesh>
            <directionalLight ref={dirLig} position={[-2, 3, 4]} intensity={1.5} />
        </>
    )
}

