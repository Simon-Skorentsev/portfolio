import styles from "./JobsList.module.scss";
import { useCallback, useState } from "react";
import { jobsData as cards } from "./jobsData";
import { Card } from "./card/card";

export function JobList() {
    const [isOpen, setISOpen] = useState<null | number>(0);

    const onClick = useCallback((index: number) => {
        if (index === isOpen) {
            setISOpen(null);
        } else {
            setISOpen(index);
        }
    }, [isOpen])

    return (
            <div className={styles.jobsList}>
                {cards.map((card, index) => {
                        return (
                            <Card
                            key={index}
                            isOpen={index === isOpen}
                            index={index}
                            setIsOpen={onClick}
                            {...card} />
                        )
                }
                )}
            </div>
    )
}
