"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GridBoard from "./GridBoard";

/**
 * props:
 *  - groups : { [tag]: photoArray }
 *  - interval : ms (기본 4000)
 */
export default function KeywordSlider({ groups, interval = 4000 }) {
  const tags = Object.keys(groups);
  const [index, setIndex] = useState(0);

  /* 자동 넘김 */
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % tags.length),
      interval
    );
    return () => clearInterval(id);
  }, [tags.length, interval]);

  const activeTag = tags[index];

  return (
    <div className="w-full flex justify-center items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <GridBoard tag={activeTag} photos={groups[activeTag]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
