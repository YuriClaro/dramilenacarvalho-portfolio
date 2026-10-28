import type { StaticImageData } from "next/image";

import before12e13 from "@/images/canal/12e13inicial.png";
import after12e13 from "@/images/canal/12e13final.png";
import before14 from "@/images/canal/14inicial.png";
import after14 from "@/images/canal/14final.png";
import before25 from "@/images/canal/25inicial.png";
import after25 from "@/images/canal/25final.png";
import before36 from "@/images/canal/36inicial.png";
import after36 from "@/images/canal/36final.png";

export type PortfolioCase = {
  title: string;
  description: string;
  tag: string;
  before: StaticImageData;
  after: StaticImageData;
};

export const portfolioContent = {
  heading: "Casos Clínicos",
  subheading: "Resultados de tratamentos realizados",
};

// Troque título, descrição e tag pelos tratamentos reais de cada caso.
export const portfolioCases: PortfolioCase[] = [
  {
    title: "Caso 1",
    description: "Resultado de tratamento.",
    tag: "Caso clínico",
    before: before14,
    after: after14,
  },
  {
    title: "Caso 2",
    description: "Resultado de tratamento.",
    tag: "Caso clínico",
    before: before25,
    after: after25,
  },
  {
    title: "Caso 3",
    description: "Resultado de tratamento.",
    tag: "Caso clínico",
    before: before36,
    after: after36,
  },
  {
    title: "Caso 4",
    description: "Resultado de tratamento.",
    tag: "Caso clínico",
    before: before12e13,
    after: after12e13,
  },
];
