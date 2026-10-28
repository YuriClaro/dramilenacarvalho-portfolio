import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ContactForm } from "./contact-form";

// jsdom não possui fetch/Response: usamos um fetch mockado com objetos simples.
function mockFetch(status: number, body: unknown) {
  const fn = jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  });
  global.fetch = fn as unknown as typeof fetch;
  return fn;
}

describe("ContactForm", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("renderiza os campos e o botão de envio", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Nome Completo")).toBeInTheDocument();
    expect(screen.getByLabelText("Telefone")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Mensagem")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /enviar mensagem/i }),
    ).toBeInTheDocument();
  });

  it("mostra sucesso e limpa o formulário após enviar", async () => {
    const user = userEvent.setup();
    const fetchMock = mockFetch(200, { ok: true });

    render(<ContactForm />);

    await user.type(screen.getByLabelText("Nome Completo"), "Maria Silva");
    await user.type(screen.getByLabelText("Telefone"), "11987654321");
    await user.type(screen.getByLabelText("E-mail"), "maria@exemplo.com");
    await user.type(screen.getByLabelText("Mensagem"), "Quero agendar.");
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      /enviada com sucesso/i,
    );
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
    expect(screen.getByLabelText("Nome Completo")).toHaveValue("");
  });

  it("mostra os erros por campo retornados pela API", async () => {
    const user = userEvent.setup();
    mockFetch(422, {
      ok: false,
      errors: { email: "Informe um e-mail válido." },
    });

    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    await waitFor(() =>
      expect(screen.getByText("Informe um e-mail válido.")).toBeInTheDocument(),
    );
    expect(screen.getByLabelText("E-mail")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("mostra erro de conexão quando o fetch falha", async () => {
    const user = userEvent.setup();
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("offline")) as unknown as typeof fetch;

    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    expect(await screen.findByRole("status")).toHaveTextContent(/sem conexão/i);
  });
});
