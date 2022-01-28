import { getRoomById, postRoom } from "../api";

export const createRoom = async (data) => {
  const body = {
    gameID: data.game,
    number_of_rounds: data?.number_of_rounds ?? 1,
  };
  return await postRoom(body);
};

export const getRoom = async (id) => {
  try {
    const { data } = await getRoomById(id);
    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
};
