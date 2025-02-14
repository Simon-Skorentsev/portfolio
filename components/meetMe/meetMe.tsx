'use client';

import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

import AppearingText from '../appearingText/appearingText';
import Astronaut from '../astronaut/astronaut';
import styles from './meetMe.module.scss';

export default function MeetMe() {
    const [isMounted, setIsMounted] = useState(false);
    const [isTitleAppeared, setIsTitleAppeared] = useState(false);

    const variants: Variants = {
        professionFadeIn: {
            y: ['2vh', '0vh'],
            opacity: [0, 0.2, 1],
            transition: {
                duration: 1,
                ease: 'easeInOut',
            },
        },
        professionInitial: {
            opacity: 0,
        },
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section className={styles.meetMe}>
            <div className={styles.info}>
                <h1
                    className={`${styles.title}${!isMounted ? ` ${styles['title--no-select']}` : ''}`}
                >
                    <AppearingText
                        afterAppearedCb={() => {
                            setIsTitleAppeared(true);
                        }}
                    >
                        Hi,
                        <br />
                        I&rsquo;m Simon,
                        <br />
                        web developer
                    </AppearingText>
                </h1>
                <motion.p
                    className={styles.profession}
                    variants={variants}
                    initial="professionInitial"
                    animate={isTitleAppeared ? 'professionFadeIn' : undefined}
                >
                    {'<Frontend Developer />'}
                </motion.p>
            </div>
            <Astronaut />
        </section>
    );
}
