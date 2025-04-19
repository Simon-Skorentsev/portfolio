'use client';

import { type ReactNode, useMemo, useRef } from 'react';

import Char from './char';

export default function AppearingText({
    children,
    afterAppearedCb,
    isWaitToAppear,
}: {
    children: string | ReactNode[];
    afterAppearedCb?: () => void;
    isWaitToAppear?: boolean;
}) {
    const content = typeof children === 'string' ? [children] : children;

    const lastStringNodeIndex = useMemo(() => {
        for (let i = content.length - 1; i >= 0; i -= 1) {
            if (typeof content[i] === 'string') {
                return i;
            }
        }

        return null;
    }, [content]);
    const charQueue = useRef(0);

    return (
        <>
            {content.map((node, nodeIndex) => {
                if (typeof node !== 'string') {
                    return node;
                }

                return node.split('').map((char, charIndex, charArr) => {
                    if (char === ' ') return char;

                    const currentQueue = charQueue.current;
                    charQueue.current += 1;
                    let cb;

                    if (
                        nodeIndex === lastStringNodeIndex &&
                        charIndex === charArr.length - 1
                    ) {
                        charQueue.current = 0;
                        cb = afterAppearedCb;
                    }

                    return (
                        <Char
                            key={currentQueue}
                            currentQueue={currentQueue}
                            isWaitToAppear={isWaitToAppear}
                            afterAppearedCb={cb}
                        >
                            {char}
                        </Char>
                    );
                });
            })}
        </>
    );
}
