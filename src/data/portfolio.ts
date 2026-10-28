import type { StaticImageData } from "next/image";

import before14 from "@/images/14inicial.png";
import after14 from "@/images/14final.png";
import before25 from "@/images/25inicial.png";
import after25 from "@/images/25final.png";

export type PortfolioCase = {
  title: string;
  description: string;
  tag: string;
  /** Fotos de antes/depois. Sem elas, o card mostra um placeholder. */
  before?: StaticImageData;
  after?: StaticImageData;
};

export const portfolioContent = {
  heading: "Portfólio de Casos",
  subheading: "Resultados reais que transformam vidas e sorrisos",
};

export const portfolioCases: PortfolioCase[] = [
  {
    title: "Clareamento e Facetas",
    description:
      "Transformação completa com clareamento dental e facetas de porcelana.",
    tag: "Estética Dental",
    before: before14,
    after: after14,
  },
  {
    title: "Tratamento Ortodôntico",
    description:
      "Alinhamento dental com aparelhos estéticos para sorriso harmonioso.",
    tag: "Ortodontia",
    before: before25,
    after: after25,
  },
  {
    title: "Reabilitação com Implantes",
    description:
      "Recuperação funcional e estética com implantes dentários unitários.",
    tag: "Implantodontia",
  },
  {
    title: "Restaurações Estéticas",
    description:
      "Reconstrução dental com resinas compostas de alta performance.",
    tag: "Restauração",
  },
  {
    title: "Sorriso Completo",
    description:
      "Plano de tratamento multidisciplinar para transformação integral.",
    tag: "Reabilitação Oral",
  },
  {
    title: "Alinhadores Invisíveis",
    description:
      "Ortodontia discreta com alinhadores transparentes removíveis.",
    tag: "Ortodontia Estética",
  },
];
