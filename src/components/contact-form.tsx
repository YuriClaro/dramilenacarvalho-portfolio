"use client";

import { useState, type FormEvent } from "react";

import type { ContactErrors } from "@/lib/contact";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setErrors({});
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok: boolean;
        errors?: ContactErrors;
        error?: string;
      };

      if (response.ok && result.ok) {
        setStatus("success");
        setMessage(
          "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        );
        form.reset();
        return;
      }

      setStatus("error");
      setErrors(result.errors ?? {});
      setMessage(
        result.errors
          ? "Confira os campos destacados."
          : (result.error ?? "Não foi possível enviar a mensagem."),
      );
    } catch {
      setStatus("error");
      setMessage("Sem conexão. Tente novamente em instantes.");
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="nome">Nome Completo</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite seu nome completo"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.nome)}
        />
        {errors.nome && <small role="alert">{errors.nome}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="telefone">Telefone</label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          placeholder="(00) 00000-0000"
          autoComplete="tel"
          required
          aria-invalid={Boolean(errors.telefone)}
        />
        {errors.telefone && <small role="alert">{errors.telefone}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="seuemail@exemplo.com"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <small role="alert">{errors.email}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="servico">Serviço de Interesse</label>
        <input
          type="text"
          id="servico"
          name="servico"
          placeholder="Ex: Clareamento, Ortodontia, etc."
        />
      </div>

      <div className="form-group">
        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          id="mensagem"
          name="mensagem"
          placeholder="Descreva seu caso ou dúvida..."
          required
          aria-invalid={Boolean(errors.mensagem)}
        />
        {errors.mensagem && <small role="alert">{errors.mensagem}</small>}
      </div>

      {/* Honeypot anti-spam: pessoas não veem nem preenchem */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={sending}
      >
        <i className="fas fa-paper-plane" />
        {sending ? "Enviando..." : "Enviar Mensagem"}
      </button>

      {message && (
        <p
          role="status"
          className={`form-status ${status === "success" ? "is-success" : "is-error"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
