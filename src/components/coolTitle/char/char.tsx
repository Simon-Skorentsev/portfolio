import styles from "./Char.module.scss";
import { motion, useAnimationControls, Variants } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { colors } from "../../../utils/colors";

export function Char({ char, charI, wordI, hoverFlags, setHoverFlags, q, motionCallback, waitingToShow }: Props) {
    const controls = useAnimationControls();
    const [canHover, setCanHover] = useState(false);

    const variants: Variants = {
        hover: {
            scale: [1, 1.2],
            rotate: [0, 10],
            color: colors.cyan,
            transition: { duration: 0.2 },
        },
        animate: {
            rotate: [0, -10, 10, -10, 10, -10, 0],
            color: [colors.cyan, colors.white],
            transition: {
                duration: 1
            },
        },
        mount: (custom: number) => ({
            color: [colors.cyanRgba(0), colors.whiteRgba(1)],
            x: ["-150px", "20px", "0px"],
            y: ["-50px", "20px", "0px"],
            rotate: ["-180deg", "30deg", "0deg"],
            scale: [3, .3, 1],
            transition: {
                delay: custom * .05,
                duration: .5,
                times: [0, .6, 1],
            },
        }),
        initial: {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            color: !waitingToShow ? colors.whiteRgba(1) : colors.whiteRgba(0),
        }
    }

    const handleHover = useCallback((wordI: number, charI: number) => {
        if (canHover) {
            setHoverFlags((prev) => {
                const newFlags = [...prev];
                newFlags[wordI][charI] = true;
                return newFlags;
            });
        }
    }, [canHover])

    useEffect(() => {
        !waitingToShow && controls.start(i => "mount")
            .then(() => {
                setCanHover(true);
                motionCallback && motionCallback();
            });
    }, [waitingToShow])

    return (
        <motion.span className={styles.char} variants={variants}
            whileHover={canHover ? "hover" : {}}
            animate={hoverFlags[wordI][charI] && canHover ? "animate" : controls}
            onMouseEnter={() => handleHover(wordI, charI)}
            custom={q}
            initial={"initial"}
            viewport={{ amount: 0, once: true }}
        >
            {char}
        </motion.span>
    )
}

interface Props {
    charI: number,
    wordI: number,
    hoverFlags: boolean[][],
    setHoverFlags: React.Dispatch<React.SetStateAction<boolean[][]>>,
    char: string,
    motionCallback?: () => void,
    q: number,
    waitingToShow?: boolean,
}