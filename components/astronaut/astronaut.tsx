'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import styles from './astronaut.module.scss';

export type HatsNumber = typeof hatsNumber; // Нужно знать заранее кол-во шапок, но просто взять Arr.length не позволит сделать dynamic import
const hatsNumber = 15 as const;
const DynamicHats = dynamic(() => import('./hats'), {
    ssr: false,
});

export default function Astronaut() {
    const [hatIndex, setHatIndex] = useState(0);
    const hatsControls = useAnimation();
    const [isMounted, setIsMounted] = useState(false);

    const onClick = async () => {
        const oldHat = hatIndex;

        if (oldHat % hatsNumber === 0) {
            hatsControls.set({ opacity: 0 });
            setHatIndex(oldHat + 1);
            hatsControls.start({ opacity: 1 });

            return;
        }

        await hatsControls.start({ opacity: 0 });
        setHatIndex(oldHat + 1);
        await hatsControls.start({ opacity: 1 });
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const variants: Variants = {
        initial: {
            x: '0px',
            y: '0px',
        },
        body: {
            rotate: ['0deg', '45deg'],
            y: ['0vh', '-1vh', '1vh'],
            x: ['0vw', '-.2vw', '.2vw'],
            transition: {
                duration: 8,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse',
            },
        },
        arm: {
            rotate: [
                '0deg',
                '5deg',
                '-5deg',
                '6deg',
                '-6deg',
                '6deg',
                '-6deg',
                '10deg',
                '-10deg',
                '15deg',
                '-15deg',
                '10deg',
                '-10deg',
                '2deg',
                '-2deg',
                '0deg',
            ],
            originX: ['37.56px'],
            originY: ['56.13px'],
            transition: {
                duration: 2,
                ease: 'easeOut',
                repeat: Infinity,
                repeatDelay: 4,
            },
        },
        head: {
            rotate: ['0deg', '-10deg', '0deg', '7deg'],
            y: ['0%', '1.5%', '0%', '-1.5%'],
            originX: ['44.66px'],
            originY: ['71.09px'],
            transition: {
                duration: 8,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 3,
                repeatType: 'reverse',
            },
        },
        tube: {
            y: ['0px', '-5px', '0px', '3px'],
            x: ['0px', '-5px', '0px', '5px'],
            transition: {
                duration: 8,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 3,
                repeatType: 'reverse',
                delay: 0.25,
            },
        },
        rLeg: {
            rotate: ['0deg', '20deg', '0deg', '20deg', '0deg'],
            originX: ['42.08px'],
            originY: ['61.59px'],
            transition: {
                duration: 6,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 3,
                repeatType: 'reverse',
            },
        },
        lLeg: {
            rotate: ['0deg', '-20deg', '0deg', '-20deg', '0deg'],
            originX: ['43.42px'],
            originY: ['62.14px'],
            transition: {
                duration: 6,
                repeat: Infinity,
                repeatDelay: 3,
                repeatType: 'reverse',
            },
        },
        chest: {
            scale: ['100%', '103.5%'],
            transition: {
                duration: 1,
                repeat: Infinity,
                repeatDelay: 1,
                repeatType: 'reverse',
            },
        },
    };

    return (
        <svg
            className={`${styles.astronaut}${!isMounted ? ` ${styles['astronaut--hide']}` : ''}`}
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
        >
            <motion.g variants={variants} initial="initial" animate="body">
                <motion.g variants={variants} initial="initial" animate="tube">
                    <path
                        fill="none"
                        stroke="#e2f1f7"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeMiterlimit="10"
                        strokeWidth="5.061"
                        d="M62.3 58.8s10.4 3.6 14.5-8.1-8.6-18.4-8.6-18.4"
                    />
                </motion.g>
                <motion.g variants={variants} initial="initial" animate="arm">
                    <path
                        fill="#8b55bb"
                        d="M34.4,58.8L16.7,45.3c-1.2-0.9-1.4-2.6-0.5-3.8l4.3-5.7c0.9-1.2,2.6-1.4,3.8-0.5L42,48.8 C42,48.8,34.4,58.8,34.4,58.8z"
                    />
                </motion.g>
                <motion.g
                    variants={variants}
                    initial="initial"
                    animate="rLeg"
                    data-svg-origin="38.8751106262207 64.57488746643067"
                >
                    <path
                        fill="#8b55bb"
                        d="M38.9 76.7L18.3 91.4c-1.2.9-2.9.6-3.8-.6L8 81.7c-.9-1.2-.6-2.9.6-3.8l20.6-14.8c3.7-2.7 9-1.8 11.6 1.9 2.7 3.8 1.8 9-1.9 11.7z"
                    />
                </motion.g>
                <motion.g variants={variants} initial="initial" animate="head">
                    <path
                        fill="#a95ed4"
                        d="M78.3 28.9c0 7.1-3.1 13.4-8 17.8-4.2 3.8-9.8 6-15.9 6-7.9 0-14.8-3.8-19.2-9.6-3-4-4.7-8.9-4.7-14.2C30.5 15.7 41.2 5 54.4 5s23.9 10.7 23.9 23.9z"
                    />
                    <path
                        fill="#563388"
                        d="M70.3 46.7c-4.2 3.8-9.8 6-15.9 6-7.9 0-14.8-3.8-19.2-9.6 4.4-3.1 9.7-4.9 15.5-4.9 7.7 0 14.7 3.3 19.6 8.5z"
                    />
                    <path
                        fill="#170609"
                        d="M32.4 28.8c-.4-7.3 3.8-15.3 11.5-18.3s21-1.2 23.4 9.5c2.4 10.7-7.8 10.9-17 11.8-9.2.9-17.2 9.6-17.9-3z"
                    />
                    <path
                        fill="#fff"
                        d="M46.8 14.2c4.7-1 9.1-.8 12.3.3 0-.5-.7-1.2-2.6-1.8-12-3.8-20.8 6.9-20.8 6.9h.1c2.4-2.4 6.4-4.4 11-5.4z"
                    />
                    <motion.g
                        transition={{ duration: 0.475 }}
                        initial={{ opacity: 0 }}
                        animate={hatsControls}
                    >
                        {isMounted && (
                            <DynamicHats index={hatIndex % hatsNumber} />
                        )}
                    </motion.g>
                </motion.g>
                <motion.g variants={variants} initial="initial" animate="chest">
                    <path
                        fill="#a95ed4"
                        d="M68.9 61.3c.2-1.5 1.3-2.8 2.8-3.1l19.2-4c1.1-.2 1.8-1.3 1.6-2.5l-1.9-8.6c-.2-1.1-1.3-1.8-2.5-1.6L67.6 46c-18.6-13.4-40.9.7-40.1 19 .8 21 38.6 25.8 41.4-3.7z"
                    />
                </motion.g>
                <motion.g
                    variants={variants}
                    initial="initial"
                    animate="lLeg"
                    data-svg-origin="42.77762908935547 67.08769836425782"
                >
                    <path
                        fill="#a95ed4"
                        d="M44.4 75.9l-8.5 17.6c-.7 1.4-2.3 1.9-3.6 1.3l-10.1-4.9c-1.4-.7-1.9-2.3-1.3-3.6l8.5-17.6c2-4.1 7-5.9 11.1-3.9 4.2 2 5.9 7 3.9 11.1z"
                    />
                </motion.g>
            </motion.g>
        </svg>
    );
}
