import { escapeHtml, validateContact } from "./contact";

const valid = {
  nome: "Maria Silva",
  telefone: "(11) 98765-4321",
  email: "maria@exemplo.com",
  servico: "Clareamento",
  mensagem: "Gostaria de agendar uma avaliação.",
  website: "",
};

describe("validateContact", () => {
  it("aceita um payload válido", () => {
    const result = validateContact(valid);
    expect(result.ok).toBe(true);
  });

  it("rejeita campos obrigatórios vazios", () => {
    const result = validateContact({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors).sort()).toEqual([
        "email",
        "mensagem",
        "nome",
        "telefone",
      ]);
    }
  });

  it("rejeita e-mail inválido", () => {
    const result = validateContact({ ...valid, email: "nao-e-email" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.email).toBeDefined();
  });

  it("rejeita telefone curto demais", () => {
    const result = validateContact({ ...valid, telefone: "1234" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.telefone).toBeDefined();
  });

  it("limpa espaços e limita o tamanho dos campos", () => {
    const result = validateContact({
      ...valid,
      nome: "  Ana  ",
      mensagem: "x".repeat(5000),
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.nome).toBe("Ana");
      expect(result.data.mensagem).toHaveLength(2000);
    }
  });

  it("ignora valores que não são texto", () => {
    const result = validateContact({ ...valid, nome: 123 });
    expect(result.ok).toBe(false);
  });

  it("aceita entrada nula sem lançar erro", () => {
    expect(validateContact(null).ok).toBe(false);
  });
});

describe("escapeHtml", () => {
  it("escapa caracteres especiais", () => {
    expect(escapeHtml(`<script>alert("x")</script> & 'y'`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;y&#39;",
    );
  });
});
