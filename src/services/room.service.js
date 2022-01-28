import { postRoom } from "../api";

export const createRoom = async (data) => {
  const body = {
    gameID: data.game,
    number_of_rounds: data?.number_of_rounds ?? 1,
  };
  return await postRoom(body);
};
