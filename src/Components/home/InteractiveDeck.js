import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CARD_COLORS = [
  "https://numerologist.com/wp-content/uploads/2014/12/08-strength-1.jpg",
  "https://i.pinimg.com/originals/04/b9/86/04b9861aa7d2583c0d864c20b69cb4ca.png",
  "https://vivre-intuitif.com/wp-content/uploads/2017/10/AE-Waite-Standard-FR8.jpg",
  "https://i.pinimg.com/originals/d4/d3/9f/d4d39f273440ac7e174869dd949e1c8f.jpg",
  "https://images.squarespace-cdn.com/content/v1/560fddf5e4b0e5d9aa30ce52/1462017024480-TN0LFYB4TATCRWWW3LWM/II_The-High-Priestess003.jpg?format=1500w",
  "https://numerologist.com/wp-content/uploads/2014/07/magician2-2-736x1189.jpg",
];

export const InteractiveDeck = ({ x = 0, y = 0 }) => {
  const [cards, setCards] = useState(CARD_COLORS);
  const moveToEnd = (from) => {
    const aux = [...cards];
    aux.shift();

    setCards(aux);
  };

  return (
    <motion.div
      className="z-20 w-1/2 h-96 relative flex items-center justify-center"
      initial={{
        opacity: 0,
        x,
        y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 1,
          ease: [0.85, 0, 0.15, 1],
        },
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
                zIndex: CARD_COLORS.length - index,
                rotate: Math.floor(Math.random() * (5 + 5 + 1)) - 5,
              }}
              exit={{ opacity: 0, scale: 0.75 }}
              drag={canDrag}
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              whileTap={{
                rotate: 0,
              }}
              whileDrag={{
                scale: 1.15,
                className: "shadow-none",
                rotate: 0,
              }}
              dragElastic={0.5}
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
  transformOrigin: "top center",
};
