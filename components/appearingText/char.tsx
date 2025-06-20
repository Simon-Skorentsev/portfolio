'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { useEffect, useState } from 'react';

import { Colors, makeRgbaColor } from '@/helpers/makeRgbaColor';

import styles from './char.module.scss';

export default function Char({
    children,
    currentQueue,
    isWaitToAppear,
    afterAppearedCb,
}: {
    children: string;
    currentQueue: number;
    isWaitToAppear?: boolean;
    afterAppearedCb?: () => void;
}) {
    const charDelay = 0.05;
    const charMountDuration = 0.5;

    const [isAppeared, setIsAppeared] = useState(false);
    const [wasHovered, setWasHovered] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        const appearAnimation = async () => {
            if (!isWaitToAppear) {
                await controls.start('mount');
                setIsAppeared(true);
                if (afterAppearedCb) afterAppearedCb();
            }
        };

        appearAnimation();
    }, [isWaitToAppear]);

    const variants: Variants = {
        mount: (custom: number) => ({
            color: [
                makeRgbaColor(Colors.TEXT_ACCENT, 0),
                makeRgbaColor(Colors.TEXT_PRIMARY),
            ],
            x: ['-150px', '20px', '0px'],
            y: ['-50px', '20px', '0px'],
            rotate: ['-180deg', '30deg', '0deg'],
            scale: [3, 0.3, 1],
            transition: {
                delay: custom * charDelay,
                duration: charMountDuration,
                times: [0, 0.6, 1],
            },
        }),
        hover: {
            scale: [1, 1.2],
            rotate: [0, 10],
            color: [Colors.TEXT_PRIMARY, Colors.TEXT_ACCENT],
            transition: { duration: 0.2 },
        },
        shake: {
            rotate: [0, -10, 10, -10, 10, -10, 0],
            color: [Colors.TEXT_ACCENT, Colors.TEXT_PRIMARY],
            transition: {
                duration: 1,
            },
        },
        initial: {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            color: makeRgbaColor(Colors.TEXT_PRIMARY, 0),
        },
    };

    return (
        <motion.span
            viewport={{ amount: 'all', once: true }}
            className={`${styles.char}${isAppeared ? '' : ' no-pointer-events'}`}
            onHoverStart={() => {
                setWasHovered(true);
            }}
            whileHover={isAppeared ? 'hover' : undefined}
            variants={variants}
            initial={'initial'}
            animate={isAppeared && wasHovered ? 'shake' : controls}
            custom={currentQueue}
        >
            {children}
        </motion.span>
    );
}
