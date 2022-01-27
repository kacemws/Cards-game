import { atom } from "jotai";

function getValue() {
  const item = localStorage.getItem("user");
  if (item !== null) {
    return JSON.parse(item);
  }
  return {};
}

const user = atom(getValue());

export const userAtom = atom(
  (get) => get(user),
  (_get, set, value) => {
    set(user, value);
    localStorage.setItem("user", JSON.stringify(value));
  }
);
