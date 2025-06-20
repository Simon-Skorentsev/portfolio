'use client';

import { useInView } from 'motion/react';
import { useRef, useState } from 'react';

import AppearingText from '../appearingText/appearingText';
import styles from './experience.module.scss';
import { JobCard } from './jobCard';

interface Project {
    name: string;
    imageSrc: string;
    text: string;
    tags: string[];
    site: string;
}
export interface Job {
    companyName: string;
    jobTitle: string;
    timeWorked: string;
    projects: Project[];
}

const jobs: Job[] = [
    {
        companyName: 'Prestoheads',
        jobTitle: 'Frontend Dev',
        timeWorked: '06.2023 - Present',
        projects: [
            {
                name: 'just-clothes',
                imageSrc: '/images/just-clothes.svg',
                site: 'https://justclothes.ru/',
                tags: [
                    'TypeScript',
                    'Next',
                    'Redux Toolkit',
                    'Motion',
                    'Foundation 6',
                    'SASS',
                    'Docker',
                    'Cypress',
                    'Mocha',
                ],
                text: `Создал PWA приложение, подключил push notifications, gtag для аналитики Google и\u00A0Yandex, онлайн оплату и\u00A0другие сервисы\n\nСделал редиректы и\u00A0генерацию названий адресов, оптимизировал запросы на\u00A0получение изображений из\u00A0CDN, ускорил время загрузки страниц`,
            },
            {
                name: 'vremena',
                imageSrc: '/images/vremena.svg',
                site: 'https://gastrovremena.ru/',
                tags: [
                    'TypeScript',
                    'Nuxt',
                    'Vue',
                    'Pinia',
                    'Zod',
                    'Foundation 6',
                    'SASS',
                ],
                text: `Создал систему компонентов, работал над улучшением\u00A0UX, создал схемы Zod`,
            },
        ],
    },
    {
        companyName: 'PyShop',
        jobTitle: 'Intern',
        timeWorked: '01.2022 - 03.2022',
        projects: [
            {
                name: 'PyShop',
                imageSrc: '/images/pyshop.png',
                site: 'https://pyshop.ru/',
                tags: ['TypeScript', 'Docker', 'Git', 'Gitlab'],
                text: 'Занимался разработкой telegram бота, также настроил Gitlab CI/CD, nginx',
            },
        ],
    },
] as const;

export default function Experience() {
    const [activeJobIndex, setActiveJobIndex] = useState<number | null>(0);

    const titleRef = useRef(null);
    const isTitleInView = useInView(titleRef, { amount: 'all', once: true });

    return (
        <section>
            <div className={styles.experience}>
                <h2 ref={titleRef} className={styles.title}>
                    <AppearingText isWaitToAppear={!isTitleInView}>
                        My Experience
                    </AppearingText>
                </h2>
                <div className={styles.jobList}>
                    {jobs.map((job, i) => {
                        return (
                            <JobCard
                                key={i}
                                job={job}
                                isOpen={activeJobIndex === i}
                                onDetailsClick={() => {
                                    setActiveJobIndex((oldValue) =>
                                        oldValue === i ? null : i,
                                    );
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
