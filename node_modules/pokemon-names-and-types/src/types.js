import pTypes from "./types_arr.json";
import findInArray from "array-find";
import includes from "array-includes";

const chk = (def, att, type) => {
  const typ = findInArray(pTypes, (o) => (o.name === def));
  return typ ? (type === "STRENGTH" ? includes(typ.strengths, att) : includes(typ.weaknesses, att)) : false;
};

const isWeak = (def = "Water", att = "Ghost") => (chk(def.toLowerCase(), att.toLowerCase(), "WEAKNESS"));

const isStrong = (def = "Water", att = "Ghost") => (chk(def.toLowerCase(), att.toLowerCase(), "STRENGTH"));

const getSuperEffectiveType = (t) => findInArray(pTypes, (o) => (o.name === t.toLowerCase())).strengths[0] || "none";

const pkmnTypes = {
    isWeak,
    isStrong,
    getSuperEffectiveType
};

export {pkmnTypes};
