import {
  GiAries,
  GiTaurus,
  GiGemini,
  GiCancer,
  GiLeo,
  GiVirgo,
  GiLibra,
  GiScorpio,
  GiSagittarius,
  GiCapricorn,
  GiAquarius,
  GiPisces,
} from "react-icons/gi";
import { IconType } from "react-icons";

export type Horoscope =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

const horoscopeIcons: Record<Horoscope, IconType> = {
  aries: GiAries,
  taurus: GiTaurus,
  gemini: GiGemini,
  cancer: GiCancer,
  leo: GiLeo,
  virgo: GiVirgo,
  libra: GiLibra,
  scorpio: GiScorpio,
  sagittarius: GiSagittarius,
  capricorn: GiCapricorn,
  aquarius: GiAquarius,
  pisces: GiPisces,
};

export function getHoroscopeIcon(
  sign: Horoscope,
  props?: { size?: number; className?: string }
) {
  const Icon = horoscopeIcons[sign.toLowerCase() as Horoscope];
  return Icon ? (
    <Icon size={props?.size ?? 24} className={props?.className} />
  ) : null;
}
