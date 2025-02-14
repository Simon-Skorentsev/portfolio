'use client';

import { useInView } from 'motion/react';
import { useRef, useState } from 'react';

import AppearingText from '../appearingText/appearingText';
import styles from './experience.module.scss';
import { JobCard } from './jobCard';

export interface Job {
    imageSrc: string;
    companyName: string;
    jobTitle: string;
    text: string;
    tags: string[];
    timeWorked?: string;
    site?: string;
}

const jobs: Job[] = [
    {
        companyName: 'Prestoheads',
        imageSrc: '/images/prestoheads.svg',
        jobTitle: 'Frontend Dev',
        tags: [
            'TypeScript',
            'Next',
            'React',
            'Redux Toolkit',
            'Nuxt',
            'Vue',
            'Pinia',
            'Git',
            'Docker',
            'Foundation 6',
            'SASS',
            'Nest',
        ],
        // text: "Создание оверлеев для OBS, доработка старых и разработка новых UI компонентов",
        // text: 'Создание отдельных страниц приложения, создание гибридного приложения, верстка таблиц, интеграция google analytics, интеграция sentry, интеграция retail rocket',
        text: `Создал PWA приложение, подключил push notifications, gtag для аналитики Google и Yandex, онлайн оплату и другие сервисы\n\nСоздал редиректы и генерацию названий адресов, оптимизировал запросы на получение изображений из CDN, оптимизировал рендер карт`,
        site: 'https://prestoheads.com/',
        timeWorked: '06.2023 - 08.2024',
    },
    {
        companyName: 'PyShop',
        imageSrc: '/images/pyshop.png',
        jobTitle: 'Intern',
        tags: ['TypeScript', 'Git', 'Gitlab CI/CD', 'Docker'],
        text: 'Занимался разработкой telegram бота, также настроил Gitlab CI/CD, nginx',
        site: 'https://pyshop.ru/',
        timeWorked: '01.2022 - 03.2022',
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
                {/* <JobList /> */}
            </div>
        </section>
    );
}
