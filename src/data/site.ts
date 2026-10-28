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

export type Experience = {
  period: string;
  role: string;
  place: string;
  description: string;
};

const whatsappNumber = "5512991948135";
const whatsappMessage = "Olá, Dra. Milena! Gostaria de agendar uma consulta.";

/**
 * Dados gerais do site. Edite os valores aqui,
 * sem precisar mexer nos componentes.
 */
export const site = {
  name: "Dra. Milena Carvalho",
  fullName: "Dra. Milena Carvalho - Cirurgiã-Dentista",
  title: "Dra. Milena Carvalho - Cirurgiã-Dentista | São José dos Campos",
  description:
    "Dra. Milena Carvalho, cirurgiã-dentista (CRO-SP 154.804) em São José dos Campos/SP. Limpeza, endodontia, reabilitação e clareamento.",
  tagline: "Cirurgiã-Dentista | CRO-SP 154.804 | Clínica geral",
  cro: "CRO-SP 154.804",
  year: 2026,
  footerText: "Cuidando da sua saúde através do seu sorriso!",
  contact: {
    addressLines: [
      "R. Armando D'Oliveira Cobra, 50 - Jardim Aquarius",
      "São José dos Campos - SP, 12246-002",
    ],
    whatsapp: "(12) 99194-8135",
    whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
    email: "dramilenascarvalho@gmail.com",
    instagram: "@dramilenascarvalho",
    instagramUrl: "https://www.instagram.com/dramilenascarvalho",
  },
} as const;

export const navItems: NavItem[] = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Tecnologia", href: "#equipamentos" },
  { label: "Contato", href: "#contato" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    href: site.contact.instagramUrl,
    icon: "fab fa-instagram",
  },
  {
    label: "WhatsApp",
    href: site.contact.whatsappUrl,
    icon: "fab fa-whatsapp",
  },
  {
    label: "E-mail",
    href: `mailto:${site.contact.email}`,
    icon: "fas fa-envelope",
  },
];

export const heroContent = {
  title: "Cuidando da sua saúde através do seu sorriso!",
  description:
    "Cirurgiã-dentista com 3 anos de experiência clínica, com ênfase em raspagem periodontal, endodontia e dentística reabilitadora. Atendimento em São José dos Campos/SP, do diagnóstico ao acompanhamento do seu caso.",
};

export const aboutContent = {
  heading: "Sobre Mim",
  subheading: "Conheça minha trajetória e minha forma de cuidar",
  experienceHeading: "Experiência profissional",
  paragraphs: [
    "Sou cirurgiã-dentista com 3 anos de experiência clínica, com ênfase em raspagem periodontal, endodontia e dentística reabilitadora. Tenho aperfeiçoamento em endodontia e estou em atualização em dentística.",
    "Atuo em diagnóstico, planejamento e execução dos tratamentos, com acompanhamento contínuo e proservação dos casos, sempre priorizando excelência técnica e cuidado integral ao paciente.",
  ],
};

export const experiences: Experience[] = [
  {
    period: "2023 – Atual",
    role: "Clínica Geral",
    place: "Odonto+Sul",
    description:
      "Diagnóstico e planejamento odontológico, raspagem periodontal, profilaxia, restaurações, lentes de contato dental e coroas, tratamento e retratamento endodôntico, exodontias simples, escaneamento intraoral e laserterapia.",
  },
  {
    period: "2024 – 2025",
    role: "Endodontia",
    place: "Sorridents",
    description:
      "Tratamentos e retratamentos endodônticos, com condução completa dos casos: diagnóstico, documentação e acompanhamento radiográfico.",
  },
];

export const credentials: Credential[] = [
  {
    icon: "fas fa-graduation-cap",
    title: "Formação",
    description: "Odontologia - Universidade Nove de Julho (2022)",
  },
  {
    icon: "fas fa-certificate",
    title: "Aperfeiçoamento",
    description: "Endodontia - OdontoSales (2024)",
  },
  {
    icon: "fas fa-book-open",
    title: "Atualização",
    description: "Dentística - UNESP (em andamento, conclusão em nov/2026)",
  },
  {
    icon: "fas fa-award",
    title: "Experiência",
    description: "3 anos de atuação clínica",
  },
];
