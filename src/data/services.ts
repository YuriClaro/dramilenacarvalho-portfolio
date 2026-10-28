export type Service = {
  icon: string;
  title: string;
  description: string;
  items: string[];
};

export const servicesContent = {
  heading: "Serviços Oferecidos",
  subheading: "Tratamentos odontológicos completos para sua saúde e bem-estar",
};

export const services: Service[] = [
  {
    icon: "fas fa-smile",
    title: "Estética Dental",
    description:
      "Transforme seu sorriso com clareamento, facetas e restaurações estéticas.",
    items: [
      "Clareamento dental a laser",
      "Facetas de porcelana",
      "Restaurações estéticas",
      "Contorno gengival",
    ],
  },
  {
    icon: "fas fa-teeth",
    title: "Ortodontia",
    description:
      "Alinhamento dental com aparelhos fixos, móveis e alinhadores invisíveis.",
    items: [
      "Aparelhos ortodônticos convencionais",
      "Alinhadores transparentes",
      "Ortodontia para adultos",
      "Manutenção e contenção",
    ],
  },
  {
    icon: "fas fa-tooth",
    title: "Reabilitação Oral",
    description:
      "Recuperação funcional e estética da boca com implantes e próteses.",
    items: [
      "Implantes dentários",
      "Próteses fixas e removíveis",
      "Reabilitação oral complexa",
      "Cirurgia oral menor",
    ],
  },
  {
    icon: "fas fa-shield-alt",
    title: "Odontologia Preventiva",
    description:
      "Prevenção e manutenção para preservar sua saúde bucal a longo prazo.",
    items: [
      "Limpeza profissional",
      "Flúor e selantes",
      "Diagnóstico precoce",
      "Educação em higiene bucal",
    ],
  },
];
