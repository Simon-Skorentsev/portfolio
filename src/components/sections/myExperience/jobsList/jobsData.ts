import { CardProps } from "./card/card";

export const jobsData: Omit<CardProps, "isOpen" | "setIsOpen" | "index">[] = [
    {
        companyName: "Hype Drop",
        imageSrc: "/images/hypedrop.png",
        jobTitle: "Front end Dev",
        tags: ["TypeScript", "React", "MobX", "CSS in JS"],
        text: "Создание оверлеев для OBS, доработка старых и разработка новых UI компонентов",
        href: "https://hypedrop.ru",
        period: "12.2022 - Present",
    },
    {
        companyName: "Freelance",
        imageSrc: "/images/fl.png",
        jobTitle: "Front end Dev",
        tags: ["JavaScript", "HTML", "SCSS", "BEM", "Gulp", "Figma", "WordPress", "React", "Redux"],
        text: "Верстка по макетам Figma, натяжка верстки на wordpress, оптимизация для Google page speed и Lighthouse, доработка сайтов на react",
        period: "08.2022 - Present",
    },
    {
        companyName: "PyShop",
        imageSrc: "/images/pyshop.png",
        jobTitle: "Intern",
        tags: ["TypeScript", "Git", "Gitlab CI/CD", "Docker"],
        text: "Занимался разработкой telegram бота, также настроил Gitlab CI/CD, nginx",
        href: "https://pyshop.ru/",
        period: "01.2022 - 03.2022",
    }
]