import { getRoomById, postRoom, postRPSRound } from "../api";

export const createRoom = async (data) => {
  try {
    const body = {
      gameID: data.game,
      number_of_rounds: data?.number_of_rounds ?? 1,
    };
    return await postRoom(body);
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const getRoom = async (id) => {
  try {
    const { data } = await getRoomById(id);
    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const addRound = async (id, data) => {
  try {
    const body = {
      playerChoice: data?.choice,
    };
    return await postRPSRound(id, body);
  } catch (error) {
    throw new Error(error?.message);
  }
};
