import { escapeHtml, validateContact } from "@/lib/contact";

const RESEND_URL = "https://api.resend.com/emails";

function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Requisição inválida." }, 400);
  }

  const result = validateContact(body);

  if (!result.ok) {
    return json({ ok: false, errors: result.errors }, 422);
  }

  const { data } = result;

  // Honeypot preenchido: provavelmente bot. Responde sucesso e descarta.
  if (data.website) {
    return json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  // Sem provedor configurado: registra no log e responde sucesso.
  if (!apiKey || !to) {
    console.info("[contact] Provedor de e-mail não configurado. Mensagem:", {
      nome: data.nome,
      telefone: data.telefone,
      email: data.email,
      servico: data.servico,
      mensagem: data.mensagem,
    });
    return json({ ok: true });
  }

  const html = `
    <h2>Nova mensagem pelo site</h2>
    <p><strong>Nome:</strong> ${escapeHtml(data.nome)}</p>
    <p><strong>Telefone:</strong> ${escapeHtml(data.telefone)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Serviço:</strong> ${escapeHtml(data.servico || "-")}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${escapeHtml(data.mensagem).replace(/\n/g, "<br>")}</p>
  `;

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: data.email,
        subject: `Novo contato: ${data.nome}`,
        html,
      }),
    });

    if (!response.ok) {
      console.error("[contact] Falha no provedor:", response.status);
      return json(
        { ok: false, error: "Não foi possível enviar a mensagem." },
        502,
      );
    }
  } catch (error) {
    console.error("[contact] Erro ao enviar:", error);
    return json(
      { ok: false, error: "Não foi possível enviar a mensagem." },
      502,
    );
  }

  return json({ ok: true });
}
