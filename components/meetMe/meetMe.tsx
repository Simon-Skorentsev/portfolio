'use client';

import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { useState } from 'react';

import AppearingText from '../appearingText/appearingText';
import Astronaut from '../astronaut/astronaut';
import styles from './meetMe.module.scss';

export default function MeetMe() {
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

    return (
        <section className={styles.meetMe}>
            <div className={styles.info}>
                <h1 className={styles.title}>
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
                    initial="professionInitial"
                    variants={variants}
                    animate={isTitleAppeared ? 'professionFadeIn' : undefined}
                >
                    {'<Front End Developer />'}
                </motion.p>
            </div>
            <Astronaut />
        </section>
    );
}
