import { getGameById, getGames, putGame } from "../api";

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

export const getGame = async (id) => {
  try {
    const { data } = await getGameById(id);
    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
};
