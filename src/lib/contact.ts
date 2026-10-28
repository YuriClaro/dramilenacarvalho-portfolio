export type ContactPayload = {
  nome: string;
  telefone: string;
  email: string;
  servico: string;
  mensagem: string;
  /** Honeypot: deve chegar vazio. Bots costumam preencher. */
  website: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

export type ValidationResult =
  { ok: true; data: ContactPayload } | { ok: false; errors: ContactErrors };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function validateContact(input: unknown): ValidationResult {
  const raw = (input ?? {}) as Record<string, unknown>;

  const data: ContactPayload = {
    nome: clean(raw.nome, 120),
    telefone: clean(raw.telefone, 30),
    email: clean(raw.email, 160),
    servico: clean(raw.servico, 120),
    mensagem: clean(raw.mensagem, 2000),
    website: clean(raw.website, 200),
  };

  const errors: ContactErrors = {};

  if (data.nome.length < 2) {
    errors.nome = "Informe seu nome completo.";
  }

  if (data.telefone.replace(/\D/g, "").length < 10) {
    errors.telefone = "Informe um telefone válido com DDD.";
  }

  if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (data.mensagem.length < 5) {
    errors.mensagem = "Escreva uma mensagem.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
