import { useRef, useState } from "react";
import { Char } from "./char/char";

/**
    Для переноса строк только \<br/>
*/
export function CoolTitle({ children, motionCallback, waitingToShow }: Props) {
    const words = children.split(" ");
    const charsFlags: boolean[][] = words.map((word) => Array(word.length).fill(false));
    const [hoverFlags, setHoverFlags] = useState<typeof charsFlags>(charsFlags);
    const queue = useRef<number>(0);

    return (
        <>
            {words.map((word, wordI) => {
                if (word === "<br/>") {
                    return <br key={wordI} />
                }

                return (
                    <span key={wordI}>
                        {word.split("").map((char, charI, charArr) => {
                            const q = queue.current++;
                            let motionCb = undefined;
                            if (motionCallback && wordI === words.length - 1 && charI === charArr.length - 1) {
                                motionCb = motionCallback
                            }
                            return (
                                <Char key={charI}
                                    char={char}
                                    charI={charI}
                                    wordI={wordI}
                                    hoverFlags={hoverFlags} q={q}
                                    setHoverFlags={setHoverFlags}
                                    motionCallback={motionCb}
                                    waitingToShow={waitingToShow}
                                />
                            )
                        })}
                        {" "}
                    </span>
                )
            })}
        </>
    )
}

interface Props {
    children: string,
    motionCallback?: () => void,
    waitingToShow?: boolean,
}
