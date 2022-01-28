import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  Deck,
  //   Body,
  Heading,
  Loader,
  NoContent,
  Progress,
  //   OutlinedButton,
  //   PageTitle,
} from "../Components";
import { getRoom } from "../services";

export const Round = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [game, setGame] = useState(null);
  const [room, setRoom] = useState(null);

  const [current] = useState(0);

  const [deck, setDeck] = useState([]);
  const [hiddenDeck, setHiddenDeck] = useState([]);

  const [selected, setSelected] = useState(null);

  const userControl = useAnimation();

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
        setGame(room?.game);
        setRoom(room);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    return () => {};
  }, [id]);

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
              <Progress current={current} total={room?.number_of_rounds} />
              <div className="w-full flex-1  flex flex-col justify-between">
                <div className="w-full h-1/3 flex flex-col items-center">
                  <Deck choices={hiddenDeck} top />
                  <Heading>CPU</Heading>
                </div>
                <div className="flex-1 w-full my-4 flex items-center justify-evenly">
                  <motion.div
                    className="mx-2 shadow relative cursor-pointer rounded-lg border bg-gray-50 border-gray-300"
                    style={{
                      height: "250px",
                      width: "180px",
                      backgroundImage: `url("${selected}")`,
                      backgroundSize: "180px 250px",
                      backgroundRepeat: "no-repeat",
                    }}
                    initial={{
                      rotate: 180,
                    }}
                  />
                  <motion.div
                    className="mx-2 shadow relative cursor-pointer rounded-lg border bg-gray-50 border-gray-300"
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
                <div className="w-full h-1/3 flex flex-col items-center">
                  <Heading>YOU</Heading>
                  <Deck
                    choices={deck}
                    onClick={(value) => {
                      setSelected(value);
                      userControl
                        .start({
                          rotate: 0,
                          transform: {
                            duration: 1,
                          },
                        })
                        .then(() => {
                          userControl.start({
                            rotate: 360,
                            transform: {
                              duration: 1,
                            },
                          });
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
