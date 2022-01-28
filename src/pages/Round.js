import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  Deck,
  Heading,
  Loader,
  NoContent,
  Progress,
  OutlinedButton,
} from "../Components";
import { addRound, getRoom } from "../services";

export const Round = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [innerLoading, setInnerLoading] = useState(false);

  const [game, setGame] = useState(null);
  const [room, setRoom] = useState(null);
  const [rounds, setRounds] = useState([]);

  const [current, setCurrent] = useState(0);

  const [deck, setDeck] = useState([]);
  const [hiddenDeck, setHiddenDeck] = useState([]);

  const [selected, setSelected] = useState(null);
  const [cpu, setCpu] = useState(null);
  const [result, setResult] = useState("");

  const userControl = useAnimation();
  const cpuControl = useAnimation();

  useEffect(() => {
    getRoom(id)
      .then((room) => {
        let deck = room?.game?.choices
          .filter((choice) => choice.value !== 0)
          .map((choice) => choice.card);

        let hiddenDeck = Array(deck?.length).fill(
          room?.game?.choices
            .filter((choice) => choice.value === 0)
            .map((choice) => choice.card)
        );
        setDeck(deck);
        setHiddenDeck(hiddenDeck);
        if (room?.game?.status?.name !== "OPEN") throw Error("Not available");
        setGame(room?.game);
        let number_of_rounds = room?.rounds?.length;
        setCurrent(number_of_rounds === 0 ? 0 : number_of_rounds);
        setRounds(room?.rounds?.sort((a, b) => a?.id - b?.id));
        setRoom(room);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    return () => {};
  }, [id]);

  const cpuCards = (hidden, card) => {
    return (
      <div
        className="backface shadow absolute rounded-lg border bg-gray-50 border-gray-300"
        style={{
          height: "250px",
          width: "180px",
          backgroundImage: `url("${card}")`,
          backgroundSize: "180px 250px",
          backgroundRepeat: "no-repeat",
          transform: `${hidden && "rotateY(180deg)"}`,
        }}
      />
    );
  };

  return (
    <>
      {loading ? (
        <Loader fullScreen />
      ) : (
        <div className="min-h-full w-full overflow-x-hidden">
          {!game || !room ? (
            <>
              <NoContent
                title="Ummmmm"
                message="The game doesn't seem to"
                highlight="exist"
                buttonTitle="Go back Home"
                clickEvent={() => {
                  navigate("/games/all");
                }}
              />
            </>
          ) : (
            <div className="h-full flex flex-col items-center">
              <Progress
                current={current}
                total={room?.number_of_rounds}
                played={rounds}
              />
              <div className="w-full flex-1  flex flex-col justify-between items-center">
                {/* CPU's Deck */}
                <div className="w-full h-1/3 flex flex-col items-center">
                  <Deck choices={hiddenDeck} top />
                  <Heading>CPU</Heading>
                </div>
                {/* table */}
                <div className="flex-1 w-full my-4 flex items-center justify-evenly">
                  {/* CPU's selected card */}
                  <motion.div
                    className="mx-2 relative"
                    style={{
                      height: "250px",
                      width: "180px",
                      transformStyle: "preserve-3d",
                    }}
                    initial={{
                      rotate: 180,
                    }}
                    animate={cpuControl}
                  >
                    {/* hidden card */}
                    {cpuCards(false, hiddenDeck[0])}
                    {/* displayed card */}
                    {cpuCards(true, cpu)}
                  </motion.div>

                  {/* Advance */}
                  <div className="flex flex-col justify-center items-center">
                    <OutlinedButton
                      title={
                        current < room?.number_of_rounds - 1
                          ? "Next Round"
                          : "Go Back Home"
                      }
                      loading={innerLoading}
                      onClick={() => {
                        if (innerLoading) return;
                        if (current > room?.number_of_rounds - 1) navigate("/");
                        else if (
                          current === room?.number_of_rounds - 1 &&
                          ![null, undefined, ""].includes(cpu)
                        ) {
                          navigate("/");
                        } else {
                          if (
                            [null, undefined, ""].includes(cpu) ||
                            [null, undefined, ""].includes(selected)
                          )
                            return;

                          userControl
                            .start({
                              opacity: [1, 0],
                              scale: [1, 0.75],
                              y: [0, 200],
                              transition: {
                                duration: 0.75,
                                ease: [0.85, 0, 0.15, 1],
                              },
                            })
                            .then((_) => {
                              setSelected(null);
                            });
                          cpuControl
                            .start({
                              rotateY: [180, 0],
                              transition: {
                                delay: 0.5,
                                duration: 0.75,
                                ease: [0.85, 0, 0.15, 1],
                              },
                            })
                            .then(() => {
                              setCpu(null);
                              setCurrent((current) => {
                                let aux = current + 1;
                                console.log({ aux });
                                return aux;
                              });
                            });
                        }
                      }}
                    />
                    {result && (
                      <>
                        <div className="h-4" />
                        <Heading>{result}</Heading>
                      </>
                    )}
                  </div>

                  {/* User's selected card */}
                  <div
                    style={{
                      height: "250px",
                      width: "180px",
                    }}
                    className="mx-2 rounded-lg border bg-gray-200 border-gray-300"
                  >
                    <motion.div
                      className="shadow relative rounded-lg border border-gray-300"
                      style={{
                        height: "250px",
                        width: "180px",
                        backgroundImage: `url("${selected}")`,
                        backgroundSize: "180px 250px",
                        backgroundRepeat: "no-repeat",
                      }}
                      animate={userControl}
                    />
                  </div>
                </div>
                {/* User's Deck */}
                <div className="w-full h-1/3 flex flex-col items-center">
                  <Heading>YOU</Heading>
                  <Deck
                    choices={deck}
                    onClick={async (value) => {
                      if (selected || innerLoading) return;
                      if (current === room?.number_of_rounds) {
                        return;
                      }
                      setInnerLoading(true);
                      const choice = game?.choices?.find(
                        ({ card }) => card === value
                      );
                      setSelected(value);
                      userControl.start({
                        opacity: [0, 1],
                        scale: [0.75, 1],
                        y: [200, 0],
                        transition: {
                          duration: 0.75,
                          ease: [0.85, 0, 0.15, 1],
                        },
                      });
                      const { data } = await addRound(id, { choice });
                      setRounds(data?.rounds?.sort((a, b) => a?.id - b?.id));

                      setCpu(data?.rounds[current].playerTwoChoice?.card);
                      if (current === data?.number_of_rounds - 1) {
                        let result = {
                          won: 0,
                          draw: 0,
                          lost: 0,
                        };
                        data?.rounds.forEach(({ result }) => {
                          if (result?.name === "DRAW") result.draw++;
                          else if (result?.name === "WIN") result.won++;
                          else result.lost++;
                        });
                        result = Object.keys(result).reduce((a, b) =>
                          result[a] > result[b] ? a : b
                        );
                        setResult((_) => {
                          return result === "won"
                            ? "YOU WON"
                            : result === "draw"
                            ? "NO ONE WON"
                            : "YOU LOST";
                        });
                      }
                      setInnerLoading(false); // to remove
                      cpuControl.start({
                        rotateY: [0, 180],
                        transition: {
                          delay: 0.5,
                          duration: 0.75,
                          ease: [0.85, 0, 0.15, 1],
                        },
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
