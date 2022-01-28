import { getGames, putGame } from "../api";

// export const updateQuiz = async (data, setQuizzes) => {
//   try {
//     // already created
//     if (!data?.id) {
//       throw new Error("Ce quiz n'existe pas");
//     }
//     const body = {
//       id: data?.id,
//       name: data?.name,
//       password: data?.password,
//       state: data?.state?.value,
//       difficulty: data?.difficulty?.value,
//       rating: data?.rating ?? 0,
//       numberOfVotes: data?.numberOfVotes ?? 0,
//       numberOfPlays: data?.numberOfPlays ?? 0,
//       quizQuestions: {
//         ...data?.quizQuestions,
//         quizId: data?.id,
//         questions: [
//           ...data?.questions.map((question) => {
//             return {
//               id: question?.id?.length > 6 ? question?.id : undefined,
//               quizQuestionsId: question?.quizQuestionsId,
//               content: question?.question,
//               type: question?.type?.value,
//               answers: question.propositions.map(
//                 ({ id, questionId, content, valid }) => {
//                   return {
//                     id: id?.length > 4 ? id : undefined,
//                     questionId,
//                     content,
//                     valid,
//                   };
//                 }
//               ),
//             };
//           }),
//         ],
//       },
//     };
//     const { data: resp } = await putQuiz(data?.id, body);
//     const quizzes = await getPaginatedPublishedQuizzes(1, 10);
//     setQuizzes(quizzes);
//     return resp?.id;
//   } catch (error) {
//     if (error?.message === "quiz with the same name already exists") {
//       throw new Error("Ce nom est déjà utilisé");
//     }
//     throw new Error(error?.message);
//   }
// };

export const getAllGames = async (page = 0, size = 10) => {
  try {
    const { data: resp } = await getGames(page, size);
    return (
      resp || {
        games: [],
        count: 0,
      }
    );
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const changeStatus = async (data) => {
  try {
    const body = {
      description: data?.description,
      id: data?.id,
      image: data?.image,
      name: data?.name,
      status: data?.status === "OPEN" ? "CLOSED" : "OPEN",
    };
    return await putGame(data?.id, body);
  } catch (error) {
    throw new Error(error?.message);
  }
};
