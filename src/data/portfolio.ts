import type { StaticImageData } from "next/image";

import before14 from "@/images/14inicial.png";
import after14 from "@/images/14final.png";
import before25 from "@/images/25inicial.png";
import after25 from "@/images/25final.png";

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
];
