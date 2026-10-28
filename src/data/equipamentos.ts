import type { StaticImageData } from "next/image";

import localizadorApical from "@/images/equipamentos/localizador-apical.png";
import motorEndodontico from "@/images/equipamentos/motor-endodontico.png";

export type Equipamento = {
  name: string;
  description: string;
  image: StaticImageData;
};

export const equipamentosContent = {
  heading: "Recursos e Tecnologia",
  subheading:
    "Disponibilidade de motor endodôntico e localizador apical para auxiliar na execução dos tratamentos endodônticos, proporcionando maior controle e precisão durante as etapas do procedimento.",
  hint: "Passe o mouse ou toque para ver os detalhes",
};

// Troque a descrição de cada equipamento pelo texto que preferir.
export const equipamentos: Equipamento[] = [
  {
    name: "Motor endodôntico",
    description:
      "Auxilia na execução dos tratamentos endodônticos, proporcionando maior controle e precisão durante as etapas do procedimento.",
    image: motorEndodontico,
  },
  {
    name: "Localizador apical",
    description:
      "Auxilia na execução dos tratamentos endodônticos, proporcionando maior controle e precisão durante as etapas do procedimento.",
    image: localizadorApical,
  },
];
