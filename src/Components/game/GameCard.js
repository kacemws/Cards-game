import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heading } from "..";

export const GameCard = ({ game, onClick }) => {
  const [cards, setCards] = useState([
    ...game.choices.map((choice) => choice?.card),
    game?.image,
  ]);
  const moveToEnd = (from) => {
    if (cards.length === 1) return;
    const aux = [...cards];
    aux.shift();
    setCards(aux);
  };

  return (
    <div onClick={onClick}>
      <motion.div
        className="z-20 h-96 relative flex flex-col items-center justify-center"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
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
                dragElastic={0.5}
                dragSnapToOrigin
                onDragEnd={() => moveToEnd(index)}
              />
            </AnimatePresence>
          );
        })}
      </motion.div>
      <div className="flex justify-center items-center">
        <Heading align="center">{game?.name}</Heading>
      </div>
    </div>
  );
};

const cardStyle = {
  width: "225px",
  height: "320px",
  // transformOrigin: "top center",
};
