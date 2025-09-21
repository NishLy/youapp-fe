// utils/zodiac.tsx
import { JSX } from "react";
import {
  GiRat,
  GiBull,
  GiTigerHead,
  GiRabbit,
  GiDragonHead,
  GiSnake,
  GiHorseHead,
  GiGoat,
  GiMonkey,
  GiRooster,
  GiSittingDog,
  GiPig,
} from "react-icons/gi";

export type Zodiac =
  | "Rat"
  | "Ox"
  | "Tiger"
  | "Rabbit"
  | "Dragon"
  | "Snake"
  | "Horse"
  | "Goat"
  | "Monkey"
  | "Rooster"
  | "Dog"
  | "Pig";

const zodiacIcons: Record<Zodiac, JSX.Element> = {
  Rat: <GiRat />,
  Ox: <GiBull />,
  Tiger: <GiTigerHead />,
  Rabbit: <GiRabbit />,
  Dragon: <GiDragonHead />,
  Snake: <GiSnake />,
  Horse: <GiHorseHead />,
  Goat: <GiGoat />,
  Monkey: <GiMonkey />,
  Rooster: <GiRooster />,
  Dog: <GiSittingDog />,
  Pig: <GiPig />,
};

export function getZodiacIcon(zodiac: Zodiac): JSX.Element {
  return zodiacIcons[zodiac];
}
