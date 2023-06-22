import moment from "moment";
import { atom } from "recoil";

export const changeState = atom({
  key: "changeState",
  default: false,
});
export const selectDayState = atom({
  key: "selectedDayState",
  default: moment(),
});

export const editState = atom({
  key: "editState",
  default: false,
});
