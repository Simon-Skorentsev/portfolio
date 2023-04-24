import { Canvas } from "@react-three/fiber";
import { motion, useAnimationControls, Variants } from "framer-motion";
import { Suspense, useCallback, useState } from "react";
import { CoolTitle } from "../../coolTitle/coolTitle";
import styles from "./Skills.module.scss";
import cn from "classnames";
import { Vector3 } from "three";
import SkillsIcosahedron from "./icosahedron/icosahedron";
import { colors } from "../../../utils/colors";

export function Skills() {
  const [canvasDisplay, setCanvasDisplay] = useState<string>("none");
  const cameraPos = [0, 0, 5];
  const controls = useAnimationControls();
  const [hideTitle, setHideTitle] = useState(true);
  const variants: Variants = {
    motion: {
      y: ["3vh", "-2vh"],
      opacity: [0, .4, 1],
      transition: {
        y: {
          type: "spring",
          damping: 0,
          stiffness: 5,
          mass: 1.3,
        },
        duration: 3,
        ease: "easeInOut",
        times: [0, .325, 1],
      },
    },
  }

  const onEnterAfterTitle = useCallback(() => {
    const oldDisplay = canvasDisplay;
    setCanvasDisplay("block");
    oldDisplay === "none" && controls.start(variants.motion)
  }, [])

  return (
    <section className={styles.skills}>
      <div className={cn("textBlock", styles.description)}>
        <motion.h2
          viewport={{ amount: "all", once: true }}
          onViewportEnter={() => setHideTitle(false)}
        >
          <CoolTitle waitingToShow={hideTitle}
            motionCallback={onEnterAfterTitle}
          >
            My Skills
          </CoolTitle>
        </motion.h2>
        <p>
          Я занимаюсь Front end разработкой уже несколько лет и за это время поработал с множеством технологий.
        </p>
        <p>
          Среди моих любимых React, Redux и TypeScript, с которыми я работаю более двух лет.
        </p>
        <p>
          В настоящее время я увлечен Three.js - библиотекой, позволяющей создавать красивую и производительную 3D-графику.
        </p>
      </div>
      <motion.div className={styles.canvas}
        variants={variants}
        animate={controls}
      >
        <Canvas style={{ display: canvasDisplay, overflow: "visible" }}
          gl={{ antialias: false, alpha: true, }}
          camera={{ position: cameraPos as unknown as Vector3 }}
        >
          <ambientLight intensity={.4} />
          <fog attach="fog" args={[colors.dark, 3, 8.5]} />
          <Suspense fallback={null} >
            <SkillsIcosahedron />
          </Suspense>
        </Canvas>
      </motion.div>
    </section>
  )
}