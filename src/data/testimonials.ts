export type Testimonial = {
  initials: string;
  name: string;
  role: string;
  text: string;
  /** Nota de 1 a 5. */
  rating: number;
};

export const testimonialsContent = {
  heading: "O Que Dizem Meus Pacientes",
  subheading: "Depoimentos reais de quem confia no meu trabalho",
};

export const testimonials: Testimonial[] = [
  {
    initials: "MC",
    name: "Maria Clara Santos",
    role: "Paciente - Estética Dental",
    rating: 5,
    text: "A Dra. Ana transformou meu sorriso completamente. O atendimento foi excepcional e o resultado superou todas as minhas expectativas. Recomendo de coração!",
  },
  {
    initials: "JP",
    name: "João Paulo Oliveira",
    role: "Paciente - Ortodontia",
    rating: 5,
    text: "Profissional extremamente competente e humana. Fiz meu tratamento ortodôntico com alinhadores e foi muito mais prático do que eu imaginava. Resultado perfeito!",
  },
  {
    initials: "AS",
    name: "Ana Souza",
    role: "Paciente - Implantodontia",
    rating: 5,
    text: "Instalação de implantes sem dor e com resultado impecável. A Dra. Ana explicou tudo detalhadamente e me deixou muito tranquila durante todo o processo.",
  },
];
