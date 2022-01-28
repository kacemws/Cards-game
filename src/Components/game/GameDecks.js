import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const GameDecks = ({ choices, animate }) => {
  const [cards, setCards] = useState([...choices]);
  const moveToEnd = () => {
    if (cards.length === 1) return;
    const aux = [...cards];
    let item = aux.shift();
    aux.push(item);
    setCards(aux);
  };
  const initial = animate && {
    opacity: 0,
    scale: 0.95,
    y: 50,
    rotate: 360,
  };
  const whileInView = animate && {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 1,
      type: "spring",
      ease: [0.85, 0, 0.15, 1],
      scale: {
        type: "spring",
        damping: 1,
      },
    },
  };
  return (
    <motion.div
      className="z-20 h-96 relative flex flex-col items-center justify-center"
      initial={{
        opacity: 0,
        scale: 0.5,
        y: 50,
        ...initial,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 1,
          ease: [0.85, 0, 0.15, 1],
        },
        ...whileInView,
      }}
    >
      {cards.map((card, index) => {
        const canDrag = index === 0;
        return (
          <AnimatePresence key={card}>
            <motion.div
              className="shadow absolute rounded-lg border border-gray-300"
              style={{
                ...cardStyle,
                backgroundImage: `url("${card}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "225px 320px",
                cursor: canDrag ? "grab" : "auto",
              }}
              animate={{
                zIndex: cards.length - index,
              }}
              exit={{ opacity: 0, scale: 0.75 }}
              drag={canDrag}
              dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              whileTap={{
                rotate: 0,
              }}
              whileDrag={{
                scale: 1.15,
                className: "shadow-none",
                rotate: 0,
              }}
              dragElastic={0.25}
              dragSnapToOrigin
              onDragEnd={() => moveToEnd(index)}
            />
          </AnimatePresence>
        );
      })}
    </motion.div>
  );
};

const cardStyle = {
  width: "225px",
  height: "320px",
  // transformOrigin: "top center",
};
