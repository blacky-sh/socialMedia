import { atom } from "recoil";

const adminAtom = atom({
  key: "adminAtom",
  default: JSON.parse(localStorage.getItem("admin")),
});

export default adminAtom;
