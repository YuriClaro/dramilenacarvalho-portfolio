export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

export type Credential = {
  icon: string;
  title: string;
  description: string;
};

/**
 * Dados gerais do site. Troque os valores de exemplo pelos reais aqui,
 * sem precisar mexer nos componentes.
 */
export const site = {
  name: "Dra. Ana Silva",
  fullName: "Dra. Ana Silva - Cirurgiã-Dentista",
  title: "Dr. Ana Silva - Dentista | Clínica Odontológica",
  description:
    "Portfólio profissional da Dra. Ana Silva - Dentista especializada em estética dental, ortodontia e reabilitação oral em São Paulo.",
  tagline: "Cuidado Odontológico Premium",
  cro: "CRO-SP 12345",
  year: 2024,
  footerText:
    "Cuidado odontológico premium com excelência, humanização e tecnologia avançada.",
  contact: {
    addressLines: [
      "Av. Paulista, 1000 - Sala 1505",
      "Bela Vista, São Paulo - SP, 01310-100",
    ],
    phone: "(11) 3456-7890",
    whatsapp: "(11) 98765-4321",
    emails: ["contato@draanasilva.com.br", "agendamento@draanasilva.com.br"],
    hours: ["Segunda a Sexta: 08:00 - 18:00", "Sábado: 08:00 - 12:00"],
  },
} as const;

export const navItems: NavItem[] = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "#", icon: "fab fa-instagram" },
  { label: "Facebook", href: "#", icon: "fab fa-facebook-f" },
  { label: "WhatsApp", href: "#", icon: "fab fa-whatsapp" },
  { label: "LinkedIn", href: "#", icon: "fab fa-linkedin-in" },
];

export const heroContent = {
  title: "Sorrisos Saudáveis, Confiança Renovada",
  description:
    "Especializada em estética dental, ortodontia e reabilitação oral. Transformo sorrisos com tecnologia avançada e atendimento humanizado, oferecendo o mais alto padrão de excelência odontológica.",
};

export const aboutContent = {
  heading: "Sobre Mim",
  subheading: "Conheça a trajetória e valores que guiam meu trabalho",
  paragraphs: [
    "Formada em Odontologia pela Universidade de São Paulo (USP), com especialização em Ortodontia e Ortopedia Facial. Há mais de 12 anos dedicando minha carreira ao cuidado integral da saúde bucal e à transformação estética de sorrisos.",
    "Meu compromisso é oferecer atendimento personalizado, com diagnóstico preciso, tratamento humanizado e resultados naturais. Utilizo as mais modernas técnicas e materiais odontológicos para garantir conforto, segurança e excelência em cada procedimento.",
  ],
};

export const credentials: Credential[] = [
  {
    icon: "fas fa-graduation-cap",
    title: "Formação",
    description: "USP - Odontologia",
  },
  {
    icon: "fas fa-certificate",
    title: "Especialização",
    description: "Ortodontia e Ortopedia Facial",
  },
  {
    icon: "fas fa-award",
    title: "Experiência",
    description: "+12 anos de atuação",
  },
  {
    icon: "fas fa-heart",
    title: "Missão",
    description: "Atendimento humanizado",
  },
];
