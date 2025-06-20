'use client';

import { motion } from 'motion/react';

import styles from './copyToClipboard.module.scss';

export default function CopyToClipboard() {
    return <motion.div className={styles.message}>COPY</motion.div>;
}
