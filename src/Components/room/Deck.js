import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const list = {
  animate: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  initial: {},
};

export const Deck = ({ choices, top = false, onClick = () => {} }) => {
  const [cards] = useState([...choices]);
  return (
    <motion.div
      className="w-full z-20 h-full relative flex items-center justify-center overflow-y-hidden"
      initial="initial"
      animate="animate"
      variants={list}
    >
      {cards.map((card, index) => {
        return (
          <AnimatePresence key={card + index} exitBeforeEnter>
            <motion.div
              onClick={() => onClick(card)}
              className="mx-2 shadow relative cursor-pointer rounded-lg border border-gray-300"
              style={{
                ...cardStyle,
                backgroundImage: `url("${card}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "180px 250px",
              }}
              variants={{
                initial: {
                  opacity: 0,
                  y: top ? -100 : 100,
                },
                animate: {
                  opacity: 1,
                  zIndex: cards.length - index,
                  y: 0,
                  transition: { duration: 0.65, type: "spring" },
                },
              }}
              exit={{ opacity: 0, scale: 0.75 }}
              whileHover={
                !top && {
                  scale: 1.15,
                  className: "shadow-none",
                  zIndex: cards.length + 1,
                }
              }
            />
          </AnimatePresence>
        );
      })}
    </motion.div>
  );
};

const cardStyle = {
  width: "180px",
  height: "250px",
  // transformOrigin: "top center",
};
