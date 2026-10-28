export type Service = {
  icon: string;
  title: string;
  description: string;
  items: string[];
};

export const servicesContent = {
  heading: "Serviços Oferecidos",
  subheading: "Cuidado clínico completo para a sua saúde bucal",
};

export const services: Service[] = [
  {
    icon: "fas fa-shield-alt",
    title: "Limpeza",
    description:
      "Prevenção e manutenção para preservar a saúde da sua boca a longo prazo.",
    items: ["Profilaxia", "Laserterapia"],
  },
  {
    icon: "fas fa-tooth",
    title: "Endodontia",
    description:
      "Tratamento do canal com diagnóstico, documentação e acompanhamento radiográfico.",
    items: [
      "Tratamento endodôntico",
      "Retratamento endodôntico",
      "Pinos intrarradiculares",
    ],
  },
  {
    icon: "fas fa-teeth",
    title: "Reabilitação",
    description:
      "Recuperação da função e da estética dos seus dentes com dentística reabilitadora.",
    items: ["Restaurações", "Lentes de contato dental", "Coroas"],
  },
  {
    icon: "fas fa-smile",
    title: "Clareamento",
    description: "Clareamento dental para um sorriso mais claro e harmônico.",
    items: [],
  },
];
