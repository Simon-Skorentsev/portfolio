import { MotionValue, useMotionTemplate, useTransform } from "framer-motion";

export function useParallax(value: MotionValue<number>, distance: number) {
    const y = useTransform(value, [0.66, 1], [-distance, distance / 10]);
    return useMotionTemplate`${y}%`;
}