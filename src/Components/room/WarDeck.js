import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const WarDeck = ({ choices, top = false, onClick = () => {} }) => {
  const [cards, setCards] = useState([...choices]);
  const moveToEnd = () => {
    if (cards.length === 1) return;
    const aux = [...cards];
    let item = aux.shift();
    aux.push(item);
    setCards(aux);
  };
  return (
    <motion.div className="z-20 h-96 relative flex flex-col items-center justify-center">
      {cards.map((card, index) => {
        return (
          <AnimatePresence key={`${card}-${top ? index : ""}`}>
            <motion.div
              onClick={() => {
                if (index === 0) {
                  onClick(card);
                  moveToEnd();
                }
              }}
              className="shadow absolute cursor-pointer rounded-lg border border-gray-300"
              style={{
                ...cardStyle,
                backgroundImage: `url("${card}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "225px 320px",
              }}
              animate={{
                opacity: 1,
                zIndex: cards.length - index,
                rotate: Math.floor(Math.random() * (5 + 5 + 1)) - 5,
              }}
              exit={{ opacity: 0, scale: 0.75 }}
              whileHover={
                !top &&
                index === 0 && {
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
  width: "225px",
  height: "320px",
  // transformOrigin: "top center",
};
