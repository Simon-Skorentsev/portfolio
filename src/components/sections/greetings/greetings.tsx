import styles from "./Greetings.module.scss";
import { CoolTitle } from "../../coolTitle/coolTitle";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { Astronaut } from "./astronaut/astronaut";
import cn from "classnames";

export function Greetings() {
    const [waitTitle, setWaitTitle] = useState(false);

    const variants: Variants = {
        showDesc: {
            y: ["2vh", "0vh"],
            opacity: [0, .2, 1],
            transition: {
                duration: 1,
                ease: "easeInOut",
            },
        },
        descInitial: {
            opacity: 0,
        }
    }

    return (
        <section className={styles.greetings}>
            <div className={cn("textBlock", styles.description)}>
                <motion.h1 className={styles.title} >
                    <CoolTitle motionCallback={() => setWaitTitle(true)}>
                        {"Hi, <br/> I'm Simon, <br/> web developer"}
                    </CoolTitle>
                </motion.h1>
                <motion.p className={styles.gray} initial="descInitial" variants={variants} animate={waitTitle ? "showDesc" : { }} >
                    {"<Front End React+TS Developer />"}
                </motion.p>
            </div>
            <div className={styles.astronaut}>
                <Astronaut />
            </div>
        </section>
    )
}