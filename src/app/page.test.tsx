import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { site } from "@/data/site";

import Home from "./page";

describe("Home", () => {
  it("renderiza todas as seções da página", () => {
    const { container } = render(<Home />);

    for (const id of ["inicio", "sobre", "servicos", "portfolio", "contato"]) {
      expect(container.querySelector(`section#${id}`)).toBeInTheDocument();
    }
  });

  it("não renderiza mais a seção de depoimentos", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("section#depoimentos")).toBeNull();
  });

  it("mostra o título principal e o rodapé com o CRO", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /cuidando da sua saúde/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(site.cro)).length).toBeGreaterThan(0);
  });

  it("aponta os botões de agendamento para o WhatsApp", () => {
    render(<Home />);

    const links = screen.getAllByRole("link", {
      name: /agendar consulta|falar no whatsapp/i,
    });
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(link).toHaveAttribute("href", site.contact.whatsappUrl);
    }
    expect(site.contact.whatsappUrl).toContain("wa.me/5512991948135");
  });

  it("renderiza o e-mail de contato como link mailto", () => {
    render(<Home />);

    expect(
      screen.getByRole("link", { name: site.contact.email }),
    ).toHaveAttribute("href", `mailto:${site.contact.email}`);
  });

  it("abre e fecha o menu mobile", async () => {
    const user = userEvent.setup();
    const { container } = render(<Home />);

    const toggle = screen.getByRole("button", { name: /abrir menu/i });
    const menu = container.querySelector(".nav-links");

    expect(menu).not.toHaveClass("is-open");

    await user.click(toggle);
    expect(menu).toHaveClass("is-open");
    expect(
      screen.getByRole("button", { name: /fechar menu/i }),
    ).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: /fechar menu/i }));
    expect(menu).not.toHaveClass("is-open");
  });
});
