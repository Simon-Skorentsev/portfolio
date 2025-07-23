'use client';

import type { Variants } from 'framer-motion';
import { motion } from 'motion/react';
import Image from 'next/image';

import type { Job } from './experience';
import styles from './jobCard.module.scss';

const image: React.CSSProperties = {
    maxWidth: '80vw',
};

const shape: React.CSSProperties = {
    strokeWidth: 2,
    strokeLinecap: 'round',
};

export function JobCard({
    job,
    isOpen,
    onDetailsClick,
}: {
    job: Job;
    isOpen?: boolean;
    onDetailsClick?: () => void;
}) {
    const variants: Variants = {
        headOpen: {
            backgroundColor: '#8e5cff',
        },
        headClose: {
            backgroundColor: '#4b2d9a',
        },
        cardOpen: {
            height: 'auto',
        },
        cardClose: {
            height: 0,
        },
        markerOpen: (direction: 'right' | 'left') =>
            direction === 'left'
                ? {
                      x1: '0',
                      y1: '50%',
                      x2: '50%',
                      y2: '100%',
                  }
                : {
                      x1: '100%',
                      y1: '50%',
                      x2: '50%',
                      y2: '100%',
                  },
        markerClose: (direction: 'right' | 'left') =>
            direction === 'left'
                ? {
                      x1: '0',
                      y1: '50%',
                      x2: '50%',
                      y2: '0',
                  }
                : {
                      x1: '100%',
                      y1: '50%',
                      x2: '50%',
                      y2: '0',
                  },
    };

    return (
        <div className={styles.accordion}>
            <motion.details
                className={styles.details}
                name="job"
                onClick={onDetailsClick}
                variants={variants}
                initial={isOpen ? 'headOpen' : 'headClose'}
                animate={isOpen ? 'headOpen' : 'headClose'}
            >
                <summary className={styles.summary}>
                    <div className={styles.title}>
                        <h3 className={styles.name}>
                            {job.jobTitle} / {job.companyName}
                        </h3>
                        <span className={styles.time}>{job.timeWorked}</span>
                    </div>
                    <span
                        className={`${styles.marker}${isOpen ? ` ${styles['marker--open']}` : ''}`}
                    >
                        <motion.svg
                            width="14"
                            height="12"
                            viewBox="0 0 14 12"
                            initial={isOpen ? 'markerOpen' : 'markerClose'}
                            animate={isOpen ? 'markerOpen' : 'markerClose'}
                            style={image}
                        >
                            <motion.line
                                custom="left"
                                stroke="#fff"
                                variants={variants}
                                style={shape}
                            />
                            <motion.line
                                custom="right"
                                stroke="#fff"
                                variants={variants}
                                style={shape}
                            />
                        </motion.svg>
                    </span>
                </summary>
            </motion.details>
            <motion.div
                className={styles.content}
                variants={variants}
                initial={isOpen ? 'cardOpen' : 'cardClose'}
                animate={isOpen ? 'cardOpen' : 'cardClose'}
                transition={{
                    duration: 0.44,
                    ease: 'easeInOut',
                }}
            >
                <div className={styles.collapseWrapper}>
                    {job.projects.map((project, projectIndex) => (
                        <div key={projectIndex} className={styles.body}>
                            <div className={styles.description}>
                                <p className={styles.text}>{project.text}</p>
                                <div className={styles.tags}>
                                    {project.tags.map((tag, tagIndex) => (
                                        <div
                                            className={styles.tag}
                                            key={tagIndex}
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <a
                                target="_blank"
                                href={project.site}
                                className={`${styles.logotype} ${styles[project.name]}`}
                            >
                                <Image
                                    fill
                                    src={project.imageSrc}
                                    alt={`${project.name} project logotype`}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
