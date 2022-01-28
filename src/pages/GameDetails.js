import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Body,
  GameDecks,
  Heading,
  Loader,
  NoContent,
  OutlinedButton,
  PageTitle,
  StartRoom,
} from "../Components";
import { getGame } from "../services";

export const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [playOpen, setPlayOpen] = useState(false);
  const [game, setGame] = useState(null);
  useEffect(() => {
    getGame(id)
      .then((resp) => {
        if (resp?.status?.name !== "OPEN") throw Error("Not available");
        setGame(resp);
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
          {!game ? (
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
              <div className="w-full flex-1 flex flex-col items-center">
                <GameDecks choices={[game?.image]} animate />
                <PageTitle>{game?.name}</PageTitle>
                <div className="h-4" />
                <Body>{game?.description}</Body>
                <div className="w-full my-4 flex-1 flex flex-col md:flex-row">
                  <div className="md:flex-1 bg-primary-100 flex flex-col items-center justify-center">
                    <GameDecks
                      choices={game?.choices
                        .filter((choice) => choice.value === 0)
                        .map((choice) => choice.card)}
                    />
                    <Heading>Cover</Heading>
                  </div>
                  <div className="md:flex-1  flex flex-col items-center justify-center">
                    <GameDecks
                      choices={game?.choices
                        .filter((choice) => choice.value !== 0)
                        .map((choice) => choice.card)}
                    />
                    <Heading>Deck</Heading>
                  </div>
                </div>
              </div>
              <OutlinedButton
                title="Start playing !"
                disabled={loading}
                loading={loading}
                onClick={(_) => {
                  setPlayOpen(true);
                  //   paginate();
                }}
              />
            </div>
          )}
        </div>
      )}
      <StartRoom setOpen={setPlayOpen} open={playOpen} game={game} />
    </>
  );
};
