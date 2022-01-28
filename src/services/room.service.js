import { getRoomById, postRoom, postRPSRound, postWARRound } from "../api";

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

export const addRound = async (rps, id, data) => {
  try {
    const body = {
      playerChoice: data?.choice,
    };
    if (rps) return await postRPSRound(id, body);
    else return await postWARRound(id, body);
  } catch (error) {
    throw new Error(error?.message);
  }
};
