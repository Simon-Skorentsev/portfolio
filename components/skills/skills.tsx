'use client';

import { Canvas } from '@react-three/fiber';
import type { Variants } from 'motion/react';
import { motion, useInView } from 'motion/react';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';

import { Colors } from '@/helpers/makeRgbaColor';

import AppearingText from '../appearingText/appearingText';
import styles from './skills.module.scss';

const DynamicIcosahedron = dynamic(() => import('../icosahedron/icosahedron'), {
    ssr: false,
});

const skillsList = [
    'TS',
    'React',
    'Redux',
    'Git',
    'SASS',
    'Next',
    'Nuxt',
    'Vue',
    'Pinia',
    'Docker',
    'Motion',
    'Nest',
] as const;

export default function Skills() {
    const cameraPos = [0, 0, 5] as const;

    const [isTitleAppeared, setIsTitleAppeared] = useState(false);
    const [isIcosahedronMounted, setIsIcosahedronMounted] = useState(false);

    const titleRef = useRef<HTMLHeadingElement>(null);
    const isTitleInView = useInView(titleRef, { amount: 'all', once: true });

    const variants: Variants = {
        mount: {
            y: ['2.5vh', '-2vh'],
            opacity: [0, 0.4, 1],
            transition: {
                y: {
                    type: 'spring',
                    damping: 0,
                    stiffness: 5,
                    mass: 1.3,
                },
                duration: 3,
                ease: 'easeInOut',
                times: [0, 0.325, 1],
            },
        },
    };

    return (
        <section className={styles.skills}>
            <div className={styles.info}>
                <h2 ref={titleRef} className={styles.title}>
                    <AppearingText
                        isWaitToAppear={!isTitleInView}
                        afterAppearedCb={() => setIsTitleAppeared(true)}
                    >
                        My Skills
                    </AppearingText>
                </h2>
                <p className={styles.text}>
                    Я&nbsp;занимаюсь Frontend разработкой уже несколько лет
                    и&nbsp;за&nbsp;это время поработал с&nbsp;множеством
                    технологий
                    <br />
                    <br />
                    Больше всего я заинтересован в работе с Next и TypeScript,
                    также работал с Vue и Nuxt, еще есть опыт написания бекенда
                    на Nest
                    <br />
                    <br />
                    В&nbsp;настоящее время увлечен созданием современных web
                    анимаций
                </p>
            </div>
            <motion.div
                className={styles.icosahedron}
                variants={variants}
                animate={
                    isTitleAppeared && isIcosahedronMounted
                        ? 'mount'
                        : { opacity: 0 }
                }
            >
                <Canvas
                    gl={{ antialias: true, alpha: true }}
                    camera={{ position: cameraPos }}
                >
                    <ambientLight intensity={0.4} />
                    <fog attach="fog" args={[Colors.BG_PRIMARY, 3, 8.5]} />
                    {isTitleAppeared && (
                        <DynamicIcosahedron
                            textVertices={skillsList}
                            setIsIcosahedronMounted={setIsIcosahedronMounted}
                        />
                    )}
                </Canvas>
            </motion.div>
        </section>
    );
}
