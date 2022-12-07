import uniqueRandomArray from "unique-random-array";
import pokemon from "./pokemon.json";

const getRandomItem = uniqueRandomArray(pokemon);
const random = (number) => {
  if (!number) {
    return getRandomItem();
  } else {
    const randomItems = [];
    for (let i = 0; i < number; i++) {
      randomItems.push(getRandomItem());
    }
    return randomItems;
  }
};

const all = pokemon;

const pkmn = {
  all,
  random
};

export {pkmn};
