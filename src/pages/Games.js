import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../data";
import {
  Loader,
  NoContent,
  GameCard,
  ChangeVisibility,
  OutlinedButton,
} from "../Components";
import { getAllGames, totalPages } from "../services";

export const Games = ({ ...props }) => {
  const [user] = useAtom(userAtom);

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [innerLoading, setInnerLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const [open, setOpen] = useState(false);

  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    getAllGames(0, 10).then(({ games, count }) => {
      setGames(
        games.filter((game) => {
          let roles = user?.roles?.map(({ name }) => name);
          if (roles?.includes("ADMIN")) return true;
          return game?.status?.name === "OPEN";
        })
      );
      setCount(count);
      setLoading(false);
      setInnerLoading(false);
    });
  }, [user]);

  const paginate = async () => {
    setInnerLoading(true);

    const { items, count } = await getAllGames(page + 1, 10);

    const aux = Array.from(new Set([...games, ...items]));
    setGames({
      aux,
    });
    setCount(count);
    setPage((page) => page + 1);
    setInnerLoading(false);
  };

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <Loader fullScreen />
      ) : (
        <div className="min-h-full w-full overflow-x-hidden">
          {games?.length === 0 ? (
            <>
              <NoContent
                title="Ummmmm"
                message="Where did the games"
                highlight="go"
              />
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-stretch">
                {games.map((game) => {
                  return (
                    <div key={game.id} className="h-64">
                      <GameCard
                        game={game}
                        list={false}
                        onClick={(_) => {
                          let roles = user?.roles?.map(({ name }) => name);
                          if (
                            roles?.includes("USER") &&
                            !roles?.includes("ADMIN")
                          ) {
                            navigate(`/games/all/${game?.id}`);
                          } else {
                            // open the change status modal
                            setSelectedGame(game);
                            setOpen(true);
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 mb-2">
                {page + 1 !== totalPages(10, count) && (
                  <OutlinedButton
                    title="Show more"
                    disabled={innerLoading || loading}
                    loading={innerLoading || loading}
                    onClick={(_) => {
                      paginate();
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <ChangeVisibility
        game={selectedGame}
        setOpen={setOpen}
        open={open}
        finalFunc={async () => {
          setInnerLoading(true);
          const { games, count } = await getAllGames(0, 10);
          setGames(
            games.filter((game) => {
              let roles = user?.roles?.map(({ name }) => name);
              if (roles?.includes("ADMIN")) return true;
              return game?.status?.name === "OPEN";
            })
          );
          setCount(count);
          setInnerLoading(false);
        }}
      />
    </>
  );
};
