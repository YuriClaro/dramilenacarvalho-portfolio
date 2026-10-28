/**
 * @jest-environment node
 */
import { POST } from "./route";

const valid = {
  nome: "Maria Silva",
  telefone: "(11) 98765-4321",
  email: "maria@exemplo.com",
  servico: "Clareamento",
  mensagem: "Gostaria de agendar uma avaliação.",
  website: "",
};

function makeRequest(body: unknown, raw = false) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw ? (body as string) : JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  const originalEnv = process.env;
  let infoSpy: jest.SpyInstance;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_TO_EMAIL;
    infoSpy = jest.spyOn(console, "info").mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
    infoSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it("retorna 400 para JSON inválido", async () => {
    const response = await POST(makeRequest("{nao-json", true));
    expect(response.status).toBe(400);
  });

  it("retorna 422 com erros por campo quando a validação falha", async () => {
    const response = await POST(makeRequest({ ...valid, email: "x" }));
    const body = await response.json();
    expect(response.status).toBe(422);
    expect(body.ok).toBe(false);
    expect(body.errors.email).toBeDefined();
  });

  it("responde sucesso e apenas registra no log sem provedor configurado", async () => {
    const fetchSpy = jest.spyOn(globalThis, "fetch");
    const response = await POST(makeRequest(valid));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(infoSpy).toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("descarta silenciosamente quando o honeypot está preenchido", async () => {
    const fetchSpy = jest.spyOn(globalThis, "fetch");
    const response = await POST(makeRequest({ ...valid, website: "spam.com" }));
    expect(response.status).toBe(200);
    expect(infoSpy).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("envia pelo provedor quando as variáveis estão configuradas", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.CONTACT_TO_EMAIL = "dest@exemplo.com";
    const fetchSpy = jest
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: 200 }));

    const response = await POST(makeRequest(valid));

    expect(response.status).toBe(200);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init as RequestInit).headers).toMatchObject({
      Authorization: "Bearer re_test",
    });
  });

  it("retorna 502 quando o provedor falha", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.CONTACT_TO_EMAIL = "dest@exemplo.com";
    jest
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: 500 }));
    jest.spyOn(console, "error").mockImplementation(() => {});

    const response = await POST(makeRequest(valid));
    expect(response.status).toBe(502);
  });
});
