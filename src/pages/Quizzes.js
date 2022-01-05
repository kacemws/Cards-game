import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { statesAtom, quizzesAtom } from "../data";
// import { getStatuses, getTypes, getDifficulties } from "../api";
import {
  Loader,
  NoContent,
  QuizCard,
  AddQuizModal,
  OutlinedButton,
} from "../Components";
import { getAllQuizzes, totalPages } from "../services";

export const Quizzes = ({ ...props }) => {
  const [states] = useAtom(statesAtom);

  const [quizzes, setQuizzes] = useAtom(quizzesAtom);
  const [loading, setLoading] = useState(true);
  const [innerLoading, setInnerLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllQuizzes("", 1, 10).then((resp) => {
      console.log({ resp });
      setQuizzes(resp);
      setLoading(false);
      setInnerLoading(false);
    });
  }, [setLoading, setInnerLoading, setQuizzes]);

  const paginate = async () => {
    setInnerLoading(true);
    const { items, count } = await getAllQuizzes(state, page + 1, 10);

    const aux = Array.from(new Set([...quizzes.items, ...items]));
    console.log({ aux });
    setQuizzes({
      items: aux,
      count,
    });
    setPage((page) => page + 1);
    setInnerLoading(false);
  };

  const changeFilter = async (state) => {
    setInnerLoading(true);
    const resp = await getAllQuizzes(state, 1, 10);
    setQuizzes(resp);
    setState(state);
    setPage(1);
    setInnerLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loader fullScreen />
      ) : (
        <div className="min-h-full w-full overflow-x-hidden">
          {quizzes.items.length === 0 ? (
            <>
              <NoContent
                title="Booo !"
                message="Aucun quiz n'a été"
                highlight="trouvé"
                buttonTitle="Créer le votre"
                clickEvent={(_) => {
                  setOpen(true);
                }}
              />
              <AddQuizModal open={open} setOpen={setOpen} />
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-stretch">
                {quizzes.items.map((quiz) => {
                  return (
                    <div key={quiz.id} className="h-64">
                      <QuizCard quiz={quiz} list={false} />
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 mb-2">
                <OutlinedButton
                  title="Afficher plus"
                  disabled={
                    innerLoading ||
                    loading ||
                    page === totalPages(10, quizzes.count)
                  }
                  loading={innerLoading || loading}
                  onClick={(_) => {
                    paginate();
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {/* <Update open={open} setOpen={setOpen} />s */}
    </>
  );
};
