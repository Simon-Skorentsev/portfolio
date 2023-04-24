import { CoolTitle } from "../../coolTitle/coolTitle";
import { motion } from "framer-motion";
import { useState } from "react";
import { JobList } from "./jobsList/jobsList";

export function MyExperience() {
    const [hideTitle, setHideTitle] = useState(true);

    return (
        <section>
            <div className="textBlock">
                <motion.h2
                    viewport={{ amount: "all", once: true }}
                    onViewportEnter={() => setHideTitle(false)}
                >
                    <CoolTitle waitingToShow={hideTitle}>
                        My Experience
                    </CoolTitle>
                </motion.h2>
                <JobList />
            </div>
        </section>
    )
}