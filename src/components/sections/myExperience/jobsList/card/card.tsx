import styles from "./Card.module.scss";
import { Transition, Variants, motion } from "framer-motion";
import cn from "classnames";

export function Card({ companyName, imageSrc, jobTitle, tags, text, isOpen, href, setIsOpen, index, period = "" }: CardProps) {

    const variants: Variants = {
        headOpen: {
            backgroundColor: "#8e5cff",
            opacity: 1,
        },
        headInitial: {
            backgroundColor: "#4b2d9a",
        },
        cardOpen: {
            height: "auto",
        },
        cardInitial: {
            height: 0,
        },
        plus: {
            rotateZ: "90deg",
        },
        closeInitial: {
            position: "absolute",
            rotateZ: "0deg",
            top: 0,
            left: 0,
        },
    }

    const transitions: Record<string, Transition> = {
        card: {
            duration: .44,
            ease: "easeInOut"
        }, 
        close: {
            type: "spring",
            damping: 25,
            stiffness: 500,
            mass: 2,
        }
    }

    return (
        <motion.div 
        className={styles.card}
        >
            <motion.div
                onClick={() => setIsOpen(index)}
                className={styles.head}
                variants={variants}
                animate={isOpen ? "headOpen" : ""}
                initial={"headInitial"}
                >
                <div className={styles.jobInfo}>
                    <h3>{`${jobTitle} / `}<span>{companyName}</span></h3>
                    <h3 className={styles.period}>{period}</h3>
                </div>
                <span className={styles.close}>
                    ㅡ
                    <motion.span
                        variants={variants}
                        initial="closeInitial"
                        animate={isOpen ? "plus" : "closeInitial"}
                        transition={transitions.close}>
                        ㅡ
                    </motion.span>
                </span>

            </motion.div>
                    <motion.div
                        variants={variants}
                        initial={isOpen ? "cardOpen" : "cardInitial"}
                        animate={isOpen ? "cardOpen" : "cardInitial"}
                        transition={transitions.card}
                    >
                        <div className={styles.contentWrapper}>
                            <div className={styles.content}>
                                <div className={styles.description}>
                                    <div className={cn(styles.cardText)}>
                                        <p>{text}</p>
                                    </div>

                                    <div className={styles.tags}>
                                        {tags.map((tag, i) => (
                                            <div className={styles.tag} key={i}>
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <a target="_blank" href={href} className={styles.companyLink}>
                                    <img className={styles.companyIcon} src={imageSrc} alt="company logo" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
        </motion.div>
    );
}

export interface CardProps {
    imageSrc: string,
    companyName: string,
    jobTitle: string,
    text: string,
    tags: string[],
    isOpen: boolean,
    index: number,
    setIsOpen: (index: number) => void,
    period?: string,
    href?: string,
}